(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const cart = new Map();
  const wishlist = new Set();
  const overlay = $("#overlay");
  const drawer = $("#bag-drawer");
  const toast = $("#toast");
  let toastTimer;

  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }
  function productFromCard(card) {
    return {
      id: card.dataset.id, name: card.dataset.name, price: Number(card.dataset.price),
      image: $("img", card).src, category: card.dataset.category
    };
  }
  function addToBag(product) {
    const existing = cart.get(product.id);
    cart.set(product.id, { ...product, qty: existing ? existing.qty + 1 : 1 });
    renderCart();
    notify(`${product.name} added to your bag`);
  }
  function renderCart() {
    const count = [...cart.values()].reduce((sum, item) => sum + item.qty, 0);
    $("#bag-count").textContent = count;
    $("#drawer-count").textContent = `(${count})`;
    $("#subtotal").textContent = money([...cart.values()].reduce((sum, item) => sum + item.price * item.qty, 0));
    const host = $("#drawer-items");
    if (!cart.size) {
      host.innerHTML = '<p class="empty-bag">Your bag is taking a quiet moment.<br>Find something lovely to bring home.</p>';
      return;
    }
    host.innerHTML = [...cart.values()].map(item => `
      <div class="bag-item" data-id="${escapeHtml(item.id)}">
        <img src="${escapeHtml(item.image)}" alt="">
        <div><h3>${escapeHtml(item.name)}</h3><p>${money(item.price)}</p>
          <div class="quantity-controls"><button data-action="decrease" aria-label="Decrease quantity">−</button><span>${item.qty}</span><button data-action="increase" aria-label="Increase quantity">+</button></div>
        </div>
        <button class="remove-item" data-action="remove" aria-label="Remove ${escapeHtml(item.name)}">×</button>
      </div>`).join("");
  }
  function money(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value); }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
  }
  function openDrawer() {
    overlay.hidden = false;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $(".drawer-close").focus();
  }
  function closeDrawer() {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    overlay.hidden = true;
    document.body.style.overflow = "";
  }
  $("#bag-open").addEventListener("click", openDrawer);
  $(".drawer-close").addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeDrawer(); });

  $$(".quick-add").forEach(button => button.addEventListener("click", () => addToBag(productFromCard(button.closest(".product-card")))));
  $$(".heart").forEach(button => button.addEventListener("click", () => {
    const card = button.closest(".product-card");
    const product = productFromCard(card);
    if (wishlist.has(product.id)) { wishlist.delete(product.id); button.classList.remove("selected"); button.textContent = "♡"; }
    else { wishlist.add(product.id); button.classList.add("selected"); button.textContent = "♥"; }
    $("#wish-count").textContent = wishlist.size;
    notify(wishlist.has(product.id) ? "Added to your wishlist" : "Removed from your wishlist");
  }));
  $("#drawer-items").addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const row = button.closest(".bag-item");
    const id = row.dataset.id;
    const item = cart.get(id);
    if (!item) return;
    if (button.dataset.action === "increase") item.qty++;
    if (button.dataset.action === "decrease") item.qty--;
    if (button.dataset.action === "remove" || item.qty <= 0) cart.delete(id);
    else cart.set(id, item);
    renderCart();
  });
  $$(".filter-chip").forEach(button => button.addEventListener("click", () => {
    $$(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
    const filter = button.dataset.filter;
    $$(".product-card").forEach(card => { card.hidden = filter !== "all" && card.dataset.category !== filter; });
  }));
  $("#newsletter-form").addEventListener("submit", event => {
    event.preventDefault();
    const email = $("#email").value.trim();
    if (!email) return;
    $("#newsletter-message").textContent = "Thanks for your interest. This demo doesn't send or store email addresses.";
    $("#email").value = "";
    notify("Thanks for joining us");
  });
  $("#checkout-button").addEventListener("click", () => notify("Demo only — no payment or order has been created."));
  $(".menu-toggle").addEventListener("click", event => {
    const nav = $(".main-nav");
    const opened = nav.classList.toggle("mobile-open");
    event.currentTarget.setAttribute("aria-expanded", String(opened));
  });
  $(".wishlist-open").addEventListener("click", () => {
    const names = [...wishlist].map(id => $(`.product-card[data-id="${CSS.escape(id)}"]`)?.dataset.name).filter(Boolean);
    notify(names.length ? `Wishlist: ${names.join(", ")}` : "Your wishlist is empty");
  });
  $(".search-toggle").addEventListener("click", () => {
    const query = prompt("Search pieces by name");
    if (!query) return;
    const normalized = query.toLowerCase();
    let found = false;
    $$(".product-card").forEach(card => {
      const match = card.dataset.name.toLowerCase().includes(normalized);
      card.hidden = !match;
      found ||= match;
    });
    $$(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.filter === "all"));
    $("#shop").scrollIntoView({ behavior: "smooth" });
    notify(found ? "Showing matching pieces" : "No matching pieces found");
  });
  renderCart();
})();