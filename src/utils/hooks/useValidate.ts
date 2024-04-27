function useValidate() {
  const Validations = {
    no_validation: {
      valid: (val) => true,
      msg: "",
    },
    not_empty: {
      valid: (val: string) => val !== "" && val !== undefined,
      msg: "שדה חובה",
    },

    email: {
      valid: (val: string) =>
        /^([\w!#$%&'*+-/=?^`{|}~]+\.)*[\w!#$%&'*+-/=?^`{|}~]+@((((([a-zA-Z0-9]{1}[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]{1})|[a-zA-Z])\.)+[a-zA-Z]{2,6})|(\d{1,3}\.){3}\d{1,3}(:\d{1,5})?)$/.test(
          val
        ),
      msg: 'כתובת דוא"ל שגויה',
    },
    cell: {
      valid: (val: string) =>
        /^(?:(0(?:50|51|52|53|54|55|58|72|73|74|76|77|78)[-]?[0-9]{7}))$/.test(
          val
        ),
      msg: "מספר סלולרי שגוי",
    },
    phone: {
      valid: (val: string) =>
        /^(?:(0(?:2|3|4|8|9|7|50|51|52|53|54|55|56|58|59|72|73|74|76|77|78)[-]?[0-9]{7}))$/.test(
          val
        ),
      msg: "מספר טלפון שגוי",
    },

    full_name: {
      valid: (val: string) =>
        /^([\w\u0590-\u05FF]{2,})+\s+([\w\u0590-\u05FF\s]{2,})+$/.test(val),
      msg: "יש למלא שם פרטי ושם משפחה",
    },

    generalInfoName: {
      valid: (val: string) => /^[a-zA-Z0-9_-]{2,}$/.test(val),
      msg: "אותיות באנגלית ומספרים בלבד (מינומום 2)",
    },
  };

  function validate(value: string, rules: Array<string>) {
    for (const rule of rules) {
      if (Object.hasOwn(Validations, rule)) {
        const validation = Validations[rule];
        const valid = validation.valid(value);
        if (!valid) {
          const msg = validation.msg;

          return { valid: false, msg };
        }
      }
    }
    return { valid: true, msg: "" };
  }

  return validate;
}

export default useValidate;
