import * as yup from "yup";
import { GLOBALS } from "../globals/constants";

export const FileSchema = yup.object().shape({
  file: yup
    .mixed()
    .test(
      "FILE_SIZE",
      "This field is required",
      (value) => !value || value?.length > 0
    )
    .test(
      "size",
      "Maximum 40mb of file size is supported",
      (value) =>
        !value || (value && value?.length > 0 && value[0].size <= 20000000)
    )
    .test(
      "type",
      "Only valid formats are supported",
      (value) =>
        !value ||
        (value &&
          value?.length > 0 &&
          GLOBALS.ALLOWED_FORMATS.includes(value[0].type))
    ),
});
