export const REQUIRED_VALIDATOR = (fieldName: string) => ({
  required: true,
  message: `${fieldName} is required.`,
});

export const MAX_NUMBER_VALIDATOR = (fieldName: string, maxValue: number) => ({
  validator: async (_: any, value: number) => {
    if (value && value > maxValue) {
      throw `False ${fieldName} ( ${fieldName} must be smaller or equal to ${maxValue} )`;
    }
  },
});

export const MIN_NUMBER_VALIDATOR = (fieldName: string, minValue: number) => ({
  validator: async (_: any, value: number) => {
    if (value && value < minValue) {
      throw `False ${fieldName} ( ${fieldName} must be greater or equal to ${minValue} )`;
    }
  },
});

export const CUSTOM_VALIDATOR = (customValidator: any) => ({
  validator: customValidator,
});
