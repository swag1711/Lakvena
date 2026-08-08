// Lakvena Collections Cart Manager
(function () {
  var CART_KEY = 'lakvena_cart';

  window.LakvenaCart = {
    getCart: function () {
      try {
        var cart = localStorage.getItem(CART_KEY);
        return cart ? JSON.parse(cart) : [];
      } catch (e) {
        return [];
      }
    },
    saveCart: function (cart) {
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
      } catch (e) {}
      window.LakvenaCart.updateCartCount();
    },
    addItem: function (item) {
      var cart = this.getCart();
      var existing = cart.find(function (i) { return i.title === item.title; });
      if (existing) {
        existing.qty += (item.qty || 1);
      } else {
        cart.push({
          id: item.id || item.title.toLowerCase().replace(/\s+/g, '-'),
          title: item.title,
          category: item.category || 'Premium Collection',
          img: item.img || 'images/L1-p1.png',
          qty: item.qty || 1
        });
      }
      this.saveCart(cart);
      this.showToast(item.title + ' added to your Cart!');
    },
    removeItem: function (index) {
      var cart = this.getCart();
      cart.splice(index, 1);
      this.saveCart(cart);
    },
    updateQuantity: function (index, qty) {
      var cart = this.getCart();
      if (cart[index]) {
        cart[index].qty = Math.max(1, parseInt(qty) || 1);
        this.saveCart(cart);
      }
    },
    clearCart: function () {
      localStorage.removeItem(CART_KEY);
      this.updateCartCount();
    },
    getTotalCount: function () {
      var cart = this.getCart();
      return cart.reduce(function (total, item) { return total + (item.qty || 1); }, 0);
    },
    updateCartCount: function () {
      var count = this.getTotalCount();
      var badges = document.querySelectorAll('.nav-item.cta a.nav-link');
      badges.forEach(function (badge) {
        badge.innerHTML = '<span class="icon-shopping_cart"></span>[' + count + ']';
      });
    },
    showToast: function (message) {
      var toast = document.getElementById('lakvenaCartToast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'lakvenaCartToast';
        toast.style.cssText = 'position:fixed; bottom:30px; right:30px; background:#8B0000; color:#fff; padding:14px 22px; border-radius:50px; box-shadow:0 8px 25px rgba(0,0,0,0.35); z-index:99999; font-weight:600; font-size:14px; display:flex; align-items:center; gap:8px; transition:all 0.3s ease; transform:translateY(100px); opacity:0; border:1px solid #D4AF37;';
        document.body.appendChild(toast);
      }
      toast.innerHTML = '<span style="color:#25D366; font-size:18px;">✓</span> ' + message + ' <a href="cart.html" style="color:#FFF6D6; text-decoration:underline; margin-left:8px;">View Cart</a>';
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
      setTimeout(function () {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
      }, 3500);
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    window.LakvenaCart.updateCartCount();
  });
})();
