// Lấy phần tử nút
const backtotop = document.getElementById("backtotop");

// Hiện nút khi cuộn xuống
window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backtotop.style.display = "block";
  } else {
    backtotop.style.display = "none";
  }
};

// Khi click thì cuộn mượt lên đầu trang
backtotop.onclick = function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Form tìm kiếm
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const allSections = document.querySelectorAll(
  ".dienthoai, .maytinhbang, .oplung, .tainghe"
);
const content = document.querySelector(".content"); // nơi hiển thị thông báo

form.addEventListener("submit", function (e) {
  e.preventDefault(); // chặn reload trang

  const keyword = input.value.toLowerCase().trim();
  let totalVisible = 0;

  allSections.forEach((section) => {
    const link = section.querySelector("a"); // tiêu đề danh mục
    const products = section.querySelectorAll(".product-card");
    let hasVisible = false;

    // Ẩn tiêu đề nếu có từ khóa
    link.style.display = keyword ? "none" : "inline-block";

    // Lọc sản phẩm
    products.forEach((product) => {
      const name = product.querySelector("h4").textContent.toLowerCase();
      const match = name.includes(keyword);

      product.parentElement.style.display =
        match || keyword === "" ? "block" : "none";
      if (match) hasVisible = true;
    });

    // Ẩn danh mục nếu không có sản phẩm khớp
    section.style.display = hasVisible || keyword === "" ? "block" : "none";

    if (hasVisible) totalVisible++;
  });

  // Thông báo nếu không tìm thấy
  let msg = document.getElementById("noResultMsg");
  if (!msg) {
    msg = document.createElement("p");
    msg.id = "noResultMsg";
    msg.className = "text-center text-muted mt-3";
    content.appendChild(msg);
  }

  if (totalVisible === 0 && keyword !== "") {
    msg.textContent = "Không tìm thấy sản phẩm phù hợp.";
    msg.style.display = "flex";
  } else {
    msg.style.display = "none";
  }
});
// End Form tìm kiếm
