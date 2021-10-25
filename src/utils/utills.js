import { toast } from "react-toastify";

export function showToast(msg, type) {
  if (type === "error") {
    toast.error(msg, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    });
  } else if (type === "success")
    toast.success(msg, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    });
  else if (type === "info")
    toast.info(msg, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    });
  else if (type === "warn") {
    toast.warn(msg, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    });
  } else {
    toast(msg, {
      position: "top-right",
      autoClose: 1300,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined
    });
  }
}

export function inputValidation() {}
