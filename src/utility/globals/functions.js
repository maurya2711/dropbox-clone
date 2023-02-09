import cookie from "js-cookie";
import moment from "moment";

export const setCookie = (key, value) => {
  cookie.set(key, value, {
    expires: 1,
    path: "/",
  });
};

export const removeCookie = (key) => {
  cookie.remove(key, {
    expires: 1,
  });
};

// convert timestamp to date format
export const convertTimeStampToDateFormat = (stamp, format = "DD MMM YYYY") => {
  if (stamp) {
    return moment(stamp).format(format);
  }
};

export function getFileType(fileName, allowedFormats) {
  const extension = fileName.split(".").pop().toLowerCase();
  switch (extension) {
    case "jpeg":
    case "png":
    case "jpg":
    case "bmp":
    case "gif":
    case "svg":
    case "tiff":
    case "webp":
      if (
        allowedFormats.includes("image/jpeg") ||
        allowedFormats.includes("image/png") ||
        allowedFormats.includes("image/jpg") ||
        allowedFormats.includes("image/bmp") ||
        allowedFormats.includes("image/gif") ||
        allowedFormats.includes("image/svg+xml") ||
        allowedFormats.includes("image/tiff") ||
        allowedFormats.includes("image/webp")
      ) {
        return "PHOTO";
      }
      break;
    case "pdf":
      if (allowedFormats.includes("application/pdf")) {
        return "PDF";
      }
      break;
    case "zip":
    case "gzip":
    case "7z":
      if (
        allowedFormats.includes("application/gzip") ||
        allowedFormats.includes("application/java-archive") ||
        allowedFormats.includes("application/zip") ||
        allowedFormats.includes("application/x-7z-compressed")
      ) {
        return "ZIP";
      }
      break;
    case "doc":
    case "docx":
    case "rtf":
    case "xls":
    case "xlsx":
    case "ppt":
    case "pptx":
    case "odp":
    case "ods":
    case "odt":
    case "xml":
      if (
        allowedFormats.includes("application/msword") ||
        allowedFormats.includes("application/rtf") ||
        allowedFormats.includes("application/vnd.ms-powerpoint") ||
        allowedFormats.includes(
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) ||
        allowedFormats.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) ||
        allowedFormats.includes("application/vnd.ms-excel") ||
        allowedFormats.includes(
          "application/vnd.oasis.opendocument.presentation"
        ) ||
        allowedFormats.includes(
          "application/vnd.oasis.opendocument.spreadsheet"
        ) ||
        allowedFormats.includes("application/vnd.oasis.opendocument.text") ||
        allowedFormats.includes("application/xml")
      ) {
        return "DOCUMENT";
      }
      break;
    case "aac":
    case "mpeg":
    case "ogg":
    case "wav":
    case "webm":
      if (
        allowedFormats.includes("audio/aac") ||
        allowedFormats.includes("audio/mpeg") ||
        allowedFormats.includes("audio/ogg") ||
        allowedFormats.includes("audio/wav") ||
        allowedFormats.includes("audio/webm")
      ) {
        return "AUDIO";
      }
      break;
    case "x-msvideo":
    case "mp4":
    case "mpeg":
    case "ogg":
    case "webm":
    case "3gpp":
      if (
        allowedFormats.includes("video/x-msvideo") ||
        allowedFormats.includes("video/mp4") ||
        allowedFormats.includes("video/mpeg") ||
        allowedFormats.includes("video/ogg") ||
        allowedFormats.includes("video/webm") ||
        allowedFormats.includes("video/3gpp")
      ) {
        return "VIDEO";
      }
      break;
  }
}
