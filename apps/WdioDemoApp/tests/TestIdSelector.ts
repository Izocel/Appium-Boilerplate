export const TestIds = {
  login: {
    inputs: {
      url: "login-inputs-url",
    },
  },
};

export function getTestProps(TestIdValue: string, count?: number) {
  return {
    testID: TestIdValue + (count ?? ""),
    accessibilityID: TestIdValue + (count ?? ""),
  };
}
