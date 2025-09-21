// tests/client.test.ts
import WaterGuruAPI from "../src/client";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

jest.mock("@aws-sdk/client-lambda");
jest.mock("amazon-cognito-identity-js");

describe("WaterGuruAPI", () => {
  const username = "test-user";
  const password = "test-pass";

  let api: WaterGuruAPI;

  beforeEach(() => {
    api = new WaterGuruAPI({ username, password });
    jest.clearAllMocks();
  });

  it("successfully logs in and fetches dashboard", async () => {
    // Mock protected methods
    jest.spyOn(api as any, "cognitoLogin").mockResolvedValue({
      idToken: "fake-id-token",
      accessToken: "fake-access-token",
      refreshToken: "fake-refresh-token",
      username,
    });

    jest.spyOn(api as any, "invokeDashboardLambda").mockResolvedValue({
      dashboardData: { status: "GREEN", waterBodies: [] },
    });

    const result = await api.getDashboard();
    expect(result).toEqual({
      dashboardData: { status: "GREEN", waterBodies: [] },
    });
  });

  it("getPools returns dashboard data", async () => {
    jest.spyOn(api as any, "getDashboard").mockResolvedValue({
      dashboardData: { status: "GREEN", waterBodies: [] },
    });

    const result = await api.getPools();
    expect(result).toEqual({
      dashboardData: { status: "GREEN", waterBodies: [] },
    });
  });

  it("constructor throws error when username or password is missing", () => {
    expect(() => new WaterGuruAPI({ username: "", password: "" })).toThrow(
      "WaterGuru username and password are required"
    );
  });

  it("invokeDashboardLambda throws error on invalid payload", async () => {
    jest.spyOn(api as any, "getAwsCredentialsFromIdToken").mockResolvedValue({
      accessKeyId: "akid",
      secretAccessKey: "sak",
      sessionToken: "st",
      expiration: new Date(),
    });

    // Provide a token that has invalid Base64 JSON in payload
    const payloadObj = { "cognito:username": "user-id" };
    const payloadBase64 = Buffer.from(JSON.stringify(payloadObj)).toString(
      "base64"
    );
    const fakeJwt = `header.${payloadBase64}.signature`;

    // Mock Lambda to return invalid JSON
    (LambdaClient as any).mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({
        Payload: Buffer.from("invalid-json"),
      }),
    }));

    await expect((api as any).invokeDashboardLambda(fakeJwt)).rejects.toThrow(
      SyntaxError
    );
  });

  it("invokeDashboardLambda returns parsed Lambda payload", async () => {
    const lambdaResponse = {
      dashboardData: { status: "GREEN", waterBodies: [] },
    };

    jest.spyOn(api as any, "getAwsCredentialsFromIdToken").mockResolvedValue({
      accessKeyId: "akid",
      secretAccessKey: "sak",
      sessionToken: "st",
      expiration: new Date(),
    });

    (LambdaClient as any).mockImplementation(() => ({
      send: jest.fn().mockResolvedValue({
        Payload: Buffer.from(JSON.stringify(lambdaResponse)),
      }),
    }));

    const payloadObj = { "cognito:username": "user-id" };
    const payloadBase64 = Buffer.from(JSON.stringify(payloadObj)).toString(
      "base64"
    );
    const fakeJwt = `header.${payloadBase64}.signature`;

    const result = await (api as any).invokeDashboardLambda(fakeJwt);
    expect(result).toEqual(lambdaResponse);
  });

  it("cognitoLogin resolves with tokens", async () => {
    const fakeTokens = {
      idToken: "id-token",
      accessToken: "access-token",
      refreshToken: "refresh-token",
      username,
    };

    // Mock CognitoUser's authenticateUser correctly
    const mockAuthenticateUser = jest
      .fn()
      .mockImplementation((authDetails: any, callbacks: any) => {
        callbacks.onSuccess({
          getIdToken: () => ({
            getJwtToken: () => fakeTokens.idToken,
            payload: { "cognito:username": username },
          }),
          getAccessToken: () => ({ getJwtToken: () => fakeTokens.accessToken }),
          getRefreshToken: () => ({ getToken: () => fakeTokens.refreshToken }),
        });
      });

    // @ts-ignore
    (CognitoUser as jest.Mock).mockImplementation(() => ({
      authenticateUser: mockAuthenticateUser,
    }));

    const tokens = await (api as any).cognitoLogin();
    expect(tokens).toEqual(fakeTokens);
  });

  it("cognitoLogin rejects on new password required", async () => {
    // Mock CognitoUser's authenticateUser to trigger newPasswordRequired
    const mockAuthenticateUser = jest
      .fn()
      .mockImplementation((authDetails: any, callbacks: any) => {
        callbacks.newPasswordRequired();
      });

    // @ts-ignore
    (CognitoUser as jest.Mock).mockImplementation(() => ({
      authenticateUser: mockAuthenticateUser,
    }));

    await expect((api as any).cognitoLogin()).rejects.toThrow(
      "User requires new password; cannot continue login here"
    );
  });

  it("cognitoLogin rejects on authentication failure", async () => {
    const mockError = new Error("Auth failed");

    // Mock CognitoUser's authenticateUser
    const mockAuthenticateUser = jest
      .fn()
      .mockImplementation((authDetails: any, callbacks: any) => {
        callbacks.onFailure(mockError);
      });

    // @ts-ignore
    (CognitoUser as jest.Mock).mockImplementation(() => ({
      authenticateUser: mockAuthenticateUser,
    }));

    await expect((api as any).cognitoLogin()).rejects.toThrow(mockError);
  });
});
