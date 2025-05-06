export function setupSidebar() {
  let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");
  let searchBtn = document.querySelector(".bx-search");
  let navLinks = document.querySelectorAll(".nav-list li a"); // Ambil semua link di sidebar

  // Fungsi untuk mengganti ikon sidebar (opsional)
  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right"); // Ganti ikon
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); // Ganti ikon
    }
  }

  // Periksa status sidebar dari localStorage
  if (localStorage.getItem("sidebarStatus") === "open") {
    sidebar.classList.add("open");
    menuBtnChange();
  }

  closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();

    // Simpan status sidebar ke localStorage
    if (sidebar.classList.contains("open")) {
      localStorage.setItem("sidebarStatus", "open");
    } else {
      localStorage.setItem("sidebarStatus", "closed");
    }
  });

  searchBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();

    // Simpan status sidebar ke localStorage
    if (sidebar.classList.contains("open")) {
      localStorage.setItem("sidebarStatus", "open");
    } else {
      localStorage.setItem("sidebarStatus", "closed");
    }
  });

  // Tambahkan event listener untuk setiap link
  navLinks.forEach((link) => {
    // Tambahkan event listener untuk klik
    link.addEventListener("click", () => {
      // Hapus kelas aktif dari semua link
      navLinks.forEach((nav) => nav.classList.remove("active"));
      // Tambahkan kelas aktif ke link yang diklik
      link.classList.add("active");

      // Sidebar tetap terbuka (tidak ada logika untuk menutup sidebar di sini)
    });

    // Periksa URL path untuk menandai link aktif
    if (link.href === window.location.href) {
      link.classList.add("active");
    }
  });
}

