const products=[
{id:1,name:"Minimal Leather Backpack",category:"Bags",price:79.99,image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",description:"A clean everyday backpack with a spacious interior."},
{id:2,name:"Classic White Sneakers",category:"Footwear",price:64.99,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",description:"Comfortable low-top sneakers designed for everyday wear."},
{id:3,name:"Everyday Analog Watch",category:"Accessories",price:119.99,image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",description:"A timeless watch with a clean face and classic strap."},
{id:4,name:"Wireless Headphones",category:"Electronics",price:149.99,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",description:"Immersive wireless audio with a comfortable over-ear fit."},
{id:5,name:"Everyday Cotton Tee",category:"Clothing",price:29.99,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",description:"Soft cotton essentials with a relaxed everyday silhouette."},
{id:6,name:"Modern Desk Lamp",category:"Home",price:54.99,image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",description:"A compact statement lamp for desks, bedrooms, and studios."},
{id:7,name:"Ceramic Coffee Mug",category:"Home",price:18.99,image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",description:"A simple ceramic mug for your daily coffee or tea."},
{id:8,name:"Canvas Crossbody Bag",category:"Bags",price:44.99,image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80",description:"Lightweight crossbody storage for everyday essentials."},
{id:9,name:"Running Trainers",category:"Footwear",price:89.99,image:"https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=800&q=80",description:"Lightweight trainers made for active days and casual looks."},
{id:10,name:"Smartphone Stand",category:"Electronics",price:24.99,image:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=800&q=80",description:"A compact stand for comfortable hands-free viewing."},
{id:11,name:"Relaxed Denim Jacket",category:"Clothing",price:94.99,image:"https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",description:"A versatile denim layer that works across seasons."},
{id:12,name:"Polarized Sunglasses",category:"Accessories",price:39.99,image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",description:"Classic frames with polarized lenses for bright days."}
];

const CART_KEY="barakah_techlabs_task5_cart";
let cart=loadCart();

const productGrid=document.querySelector("#productGrid");
const productCount=document.querySelector("#productCount");
const emptyState=document.querySelector("#emptyState");
const productSearch=document.querySelector("#productSearch");
const categoryFilter=document.querySelector("#categoryFilter");
const sortSelect=document.querySelector("#sortSelect");
const clearFilters=document.querySelector("#clearFilters");
const cartButton=document.querySelector("#cartButton");
const cartDrawer=document.querySelector("#cartDrawer");
const cartOverlay=document.querySelector("#cartOverlay");
const closeCart=document.querySelector("#closeCart");
const cartItems=document.querySelector("#cartItems");
const cartCount=document.querySelector("#cartCount");
const cartTotal=document.querySelector("#cartTotal");
const clearCartButton=document.querySelector("#clearCartButton");
const checkoutButton=document.querySelector("#checkoutButton");
const toast=document.querySelector("#toast");

function loadCart(){
  try{
    const stored=JSON.parse(localStorage.getItem(CART_KEY)||"[]");
    return Array.isArray(stored)?stored.filter(function(item){return item&&Number.isInteger(item.id)&&Number.isInteger(item.quantity)&&item.quantity>0;}):[];
  }catch(error){return [];}
}
function saveCart(){localStorage.setItem(CART_KEY,JSON.stringify(cart));renderCart();}
function money(value){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(value);}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,function(char){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char];});}

function populateCategories(){
  Array.from(new Set(products.map(function(product){return product.category;}))).sort().forEach(function(category){
    const option=document.createElement("option");
    option.value=category;
    option.textContent=category;
    categoryFilter.appendChild(option);
  });
}
function getFilteredProducts(){
  const query=productSearch.value.trim().toLowerCase();
  const category=categoryFilter.value;
  const sort=sortSelect.value;
  let result=products.filter(function(product){
    const matchesSearch=!query||product.name.toLowerCase().includes(query)||product.description.toLowerCase().includes(query);
    const matchesCategory=category==="all"||product.category===category;
    return matchesSearch&&matchesCategory;
  });
  if(sort==="price-asc")result.sort(function(a,b){return a.price-b.price;});
  if(sort==="price-desc")result.sort(function(a,b){return b.price-a.price;});
  return result;
}
function renderProducts(){
  const visible=getFilteredProducts();
  productCount.textContent=visible.length+" product"+(visible.length===1?"":"s");
  emptyState.classList.toggle("hidden",visible.length!==0);
  productGrid.classList.toggle("hidden",visible.length===0);
  productGrid.innerHTML=visible.map(function(product){
    return '<article class="product-card">'+
      '<div class="product-image-wrap"><img class="product-image" src="'+escapeHtml(product.image)+'" alt="'+escapeHtml(product.name)+'" loading="lazy"><span class="category-badge">'+escapeHtml(product.category)+'</span></div>'+
      '<div class="product-info"><p class="product-category">'+escapeHtml(product.category)+'</p><h3 class="product-title">'+escapeHtml(product.name)+'</h3><p class="product-description">'+escapeHtml(product.description)+'</p>'+
      '<div class="product-bottom"><span class="product-price">'+money(product.price)+'</span><button class="add-button" type="button" data-add="'+product.id+'">Add to cart</button></div></div></article>';
  }).join("");
}
function getCartProductEntries(){
  return cart.map(function(item){
    const product=products.find(function(candidate){return candidate.id===item.id;});
    return product?{product:product,quantity:item.quantity}:null;
  }).filter(Boolean);
}
function renderCart(){
  const entries=getCartProductEntries();
  const itemCount=entries.reduce(function(sum,item){return sum+item.quantity;},0);
  const total=entries.reduce(function(sum,item){return sum+item.product.price*item.quantity;},0);
  cartCount.textContent=itemCount;
  cartTotal.textContent=money(total);
  clearCartButton.disabled=entries.length===0;
  checkoutButton.disabled=entries.length===0;
  if(entries.length===0){
    cartItems.innerHTML='<div class="cart-empty"><h3>Your cart is empty</h3><p>Add products from the catalog to see them here.</p></div>';
    return;
  }
  cartItems.innerHTML=entries.map(function(entry){
    const product=entry.product;
    const quantity=entry.quantity;
    return '<div class="cart-item"><img class="cart-item-image" src="'+escapeHtml(product.image)+'" alt="'+escapeHtml(product.name)+'">'+
      '<div class="cart-item-info"><h3>'+escapeHtml(product.name)+'</h3><p>'+money(product.price)+' each</p>'+
      '<div class="quantity-controls" aria-label="Quantity controls"><button type="button" data-decrease="'+product.id+'" aria-label="Decrease quantity">−</button><span>'+quantity+'</span><button type="button" data-increase="'+product.id+'" aria-label="Increase quantity">+</button></div></div>'+
      '<div class="cart-item-side"><span class="cart-item-price">'+money(product.price*quantity)+'</span><button class="remove-button" type="button" data-remove="'+product.id+'">Remove</button></div></div>';
  }).join("");
}
function addToCart(id){
  const product=products.find(function(item){return item.id===id;});
  if(!product)return;
  const existing=cart.find(function(item){return item.id===id;});
  if(existing)existing.quantity+=1;else cart.push({id:id,quantity:1});
  saveCart();
  showToast(product.name+" added to cart");
}
function updateQuantity(id,delta){
  const item=cart.find(function(entry){return entry.id===id;});
  if(!item)return;
  item.quantity+=delta;
  if(item.quantity<=0)cart=cart.filter(function(entry){return entry.id!==id;});
  saveCart();
}
function removeFromCart(id){
  const product=products.find(function(item){return item.id===id;});
  cart=cart.filter(function(item){return item.id!==id;});
  saveCart();
  if(product)showToast(product.name+" removed from cart");
}
function openCart(){
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden","false");
  cartOverlay.classList.remove("hidden");
  document.body.style.overflow="hidden";
}
function closeCartDrawer(){
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden","true");
  cartOverlay.classList.add("hidden");
  document.body.style.overflow="";
}
let toastTimer;
function showToast(message){
  toast.textContent=message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(function(){toast.classList.remove("show");},2200);
}

productGrid.addEventListener("click",function(event){
  const button=event.target.closest("[data-add]");
  if(button)addToCart(Number(button.dataset.add));
});
cartItems.addEventListener("click",function(event){
  const increase=event.target.closest("[data-increase]");
  const decrease=event.target.closest("[data-decrease]");
  const remove=event.target.closest("[data-remove]");
  if(increase)updateQuantity(Number(increase.dataset.increase),1);
  if(decrease)updateQuantity(Number(decrease.dataset.decrease),-1);
  if(remove)removeFromCart(Number(remove.dataset.remove));
});
[productSearch,categoryFilter,sortSelect].forEach(function(control){control.addEventListener("input",renderProducts);});
clearFilters.addEventListener("click",function(){
  productSearch.value="";
  categoryFilter.value="all";
  sortSelect.value="default";
  renderProducts();
});
cartButton.addEventListener("click",openCart);
closeCart.addEventListener("click",closeCartDrawer);
cartOverlay.addEventListener("click",closeCartDrawer);
document.addEventListener("keydown",function(event){if(event.key==="Escape")closeCartDrawer();});
clearCartButton.addEventListener("click",function(){
  if(cart.length===0)return;
  cart=[];
  saveCart();
  showToast("Shopping cart cleared");
});
checkoutButton.addEventListener("click",function(){
  if(cart.length===0)return;
  showToast("Demo checkout ready — no payment is processed.");
});

populateCategories();
renderProducts();
renderCart();