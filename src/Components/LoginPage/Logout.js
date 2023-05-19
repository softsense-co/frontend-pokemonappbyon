import Swal from "sweetalert2";

export function logout() {
  Swal.fire({
    title: "Logout Confirmation",
    text: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Success", "Logout successful!", "success").then(() => {
        window.location.reload(true);
        localStorage.clear();
      });
    }
  });
}
