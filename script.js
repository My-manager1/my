/* =====================================================
   MY MANAGER
   Main JavaScript + Supabase Authentication
===================================================== */


/* =====================================================
   SUPABASE CONFIG
===================================================== */

const SUPABASE_URL =
  "https://wdkgquixyujuorhhwvcp.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_ZvDmSbOy_FqqSblJNVyObw_shXMgJ7U";


/* =====================================================
   LOAD SUPABASE
===================================================== */

function loadSupabase() {

  return new Promise((resolve, reject) => {

    if (window.supabase) {
      resolve(window.supabase);
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";

    script.onload = () => {

      if (window.supabase) {
        resolve(window.supabase);
      } else {
        reject(
          new Error("Supabase failed to load.")
        );
      }

    };

    script.onerror = () => {

      reject(
        new Error("Could not load Supabase.")
      );

    };

    document.head.appendChild(script);

  });

}


/* =====================================================
   PLAN DATA
===================================================== */

const planData = {

  elite: {
    name: "Elite",
    forText: "FOR BUSINESS OWNERS",
    price: "₹24,999 / Lifetime",
    icon: "♛",
    theme: "elite",
    subtitle: "Complete business support ecosystem.",
    services: [
      "Dedicated Business Manager",
      "Banking & Financial Assistance",
      "Business Loan Support",
      "Loan Settlement Assistance",
      "Staff Salary Account Support",
      "Investment Advisory",
      "Tax & ITR Coordination",
      "Insurance & Claim Assistance",
      "Factory & Fire Insurance",
      "Medical Check-up Coordination",
      "Digital Marketing Guidance",
      "Website & App Development",
      "ERP / Business Software",
      "Business Growth & Branding",
      "Government & Bank Liaison",
      "Representation on Your Behalf",
      "MSME & Government Schemes",
      "Licence & Registration Support",
      "Notice Response & Drafting",
      "Bank & Government Notices",
      "Document Preparation Support",
      "Compliance & Renewal Reminders",
      "CA / CS / Legal Coordination",
      "Vendor & Professional Network",
      "Quarterly Business Review",
      "Priority Helpline & Support",
      "Emergency Business Support",
      "Employee Welfare Support",
      "Exclusive Partner Benefits"
    ]
  },

  shaurya: {
    name: "Shaurya",
    forText: "FOR DEFENCE PERSONNEL",
    price: "₹6,370 / Lifetime",
    icon: "✦",
    theme: "shaurya",
    subtitle: "Dedicated support for defence personnel.",
    services: [
      "Lifetime Membership",
      "Banking & Loan Assistance",
      "Mediclaim Support",
      "Insurance Claim Assistance",
      "Financial Advisory",
      "Emergency Banking Support",
      "Priority Helpline",
      "Document Management",
      "Personal Assistance",
      "Service Coordination"
    ]
  },

  professional: {
    name: "Professional",
    forText: "FOR WORKING PROFESSIONALS",
    price: "₹6,370 / Lifetime",
    icon: "▣",
    theme: "professional",
    subtitle: "Professional assistance and coordination.",
    services: [
      "Personal Manager Support",
      "Financial Coordination",
      "Insurance Assistance",
      "Document Support",
      "Priority Helpline"
    ]
  },

  aarogya: {
    name: "Aarogya",
    forText: "FOR DOCTORS",
    price: "₹6,370 / Lifetime",
    icon: "♧",
    theme: "aarogya",
    subtitle: "Dedicated assistance for doctors.",
    services: [
      "Personal Manager Support",
      "Financial Coordination",
      "Insurance Assistance",
      "Document Support",
      "Priority Helpline"
    ]
  },

  global: {
    name: "Global",
    forText: "FOR NRI",
    price: "Coming Soon",
    icon: "◎",
    theme: "global",
    subtitle: "NRI-focused support and coordination.",
    services: [
      "Banking Coordination",
      "Document Support",
      "Insurance Assistance",
      "Financial Guidance",
      "Dedicated Assistance"
    ]
  },

  samaj: {
    name: "Samaj Gaurav",
    forText: "FOR SENIOR CITIZENS",
    price: "Coming Soon",
    icon: "♟",
    theme: "samaj",
    subtitle: "Assistance designed for senior citizens.",
    services: [
      "Personal Assistance",
      "Banking Support",
      "Insurance Coordination",
      "Document Management",
      "Priority Support"
    ]
  },

  women: {
    name: "Women",
    forText: "FOR WOMEN",
    price: "₹6,370 / Lifetime",
    icon: "◉",
    theme: "women",
    subtitle: "Personal and financial support services.",
    services: [
      "Personal Manager Support",
      "Financial Coordination",
      "Insurance Assistance",
      "Document Support",
      "Priority Helpline"
    ]
  },

  student: {
    name: "Student",
    forText: "FOR STUDENTS",
    price: "₹99 / Lifetime",
    icon: "◆",
    theme: "student",
    subtitle: "Affordable support for students.",
    services: [
      "Basic Personal Assistance",
      "Document Support",
      "Guidance & Coordination",
      "Priority Helpdesk"
    ]
  }

};


/* =====================================================
   ELEMENTS
===================================================== */

const pages =
  document.querySelectorAll(".page");

const navControls =
  document.querySelectorAll("[data-page]");

const planControls =
  document.querySelectorAll("[data-plan]");

const sidebar =
  document.getElementById("sidebar");

const menuBtn =
  document.getElementById("menuBtn");


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function showPage(pageName) {

  pages.forEach(page => {

    page.classList.toggle(
      "active",
      page.id === `page-${pageName}`
    );

  });

  document
    .querySelectorAll(".side-link, .bottom-link")
    .forEach(link => {

      link.classList.toggle(
        "active",
        link.dataset.page === pageName
      );

    });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (sidebar) {

    sidebar.classList.remove(
      "mobile-open"
    );

    sidebar.classList.remove(
      "desktop-open"
    );

  }

}


/* =====================================================
   OPEN PLAN
===================================================== */

function openPlan(planKey) {

  const plan = planData[planKey];

  if (!plan) return;

  const detailTitle =
    document.getElementById("detailTitle");

  const detailFor =
    document.getElementById("detailFor");

  const detailPrice =
    document.getElementById("detailPrice");

  const detailIcon =
    document.getElementById("detailIcon");

  const detailSubtitle =
    document.getElementById("detailSubtitle");

  const detailHero =
    document.getElementById("detailHero");

  const serviceGrid =
    document.getElementById("serviceGrid");

  if (detailTitle)
    detailTitle.textContent = plan.name;

  if (detailFor)
    detailFor.textContent = plan.forText;

  if (detailPrice)
    detailPrice.textContent = plan.price;

  if (detailIcon)
    detailIcon.textContent = plan.icon;

  if (detailSubtitle)
    detailSubtitle.textContent = plan.subtitle;

  if (detailHero) {

    detailHero.className =
      "detail-hero";

    detailHero.classList.add(
      `${plan.theme}-theme`
    );

  }

  if (serviceGrid) {

    serviceGrid.innerHTML =
      plan.services
        .map(service => `
          <div class="service-item">
            <span>✓</span>
            <div>${service}</div>
          </div>
        `)
        .join("");

  }

  const message =
    encodeURIComponent(

`Hello Jatin Mishra,

I am interested in the ${plan.name} Plan (${plan.price}) of My Manager.

Please share the membership procedure, payment details and next steps.

Thank you.`

    );

  const buyPlanBtn =
    document.getElementById("buyPlanBtn");

  if (buyPlanBtn) {

    buyPlanBtn.href =
      `https://wa.me/919649950866?text=${message}`;

    buyPlanBtn.textContent =
      plan.price === "Coming Soon"
        ? "Enquire on WhatsApp"
        : "Buy Plan";

  }

  showPage("details");

}


/* =====================================================
   MOBILE / DESKTOP MENU FIX
===================================================== */

if (menuBtn && sidebar) {

  menuBtn.type = "button";

  menuBtn.addEventListener(
    "click",
    event => {

      event.preventDefault();

      event.stopPropagation();

      const isMobile =
        window.innerWidth <= 760;

      if (isMobile) {

        sidebar.classList.toggle(
          "mobile-open"
        );

      } else {

        sidebar.classList.toggle(
          "desktop-open"
        );

      }

    }
  );

}


/* =====================================================
   SIDEBAR LINKS
===================================================== */

document
  .querySelectorAll(".side-link")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        if (sidebar) {

          sidebar.classList.remove(
            "mobile-open"
          );

        }

      }
    );

  });


/* =====================================================
   PAGE NAVIGATION EVENTS
===================================================== */

navControls.forEach(control => {

  control.addEventListener(
    "click",
    event => {

      event.preventDefault();

      const pageName =
        control.dataset.page;

      if (pageName) {

        showPage(pageName);

      }

    }
  );

});


/* =====================================================
   PLAN EVENTS
===================================================== */

planControls.forEach(control => {

  control.addEventListener(
    "click",
    () => {

      const planKey =
        control.dataset.plan;

      if (planKey) {

        openPlan(planKey);

      }

    }
  );

});


/* =====================================================
   AUTH UI CSS
===================================================== */

function addAuthStyles() {

  if (
    document.getElementById(
      "myManagerAuthStyles"
    )
  ) {
    return;
  }

  const style =
    document.createElement("style");

  style.id =
    "myManagerAuthStyles";

  style.textContent = `

    .auth-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-left: auto;
      margin-right: 10px;
    }

    .auth-top-btn {
      border: 1px solid rgba(255,255,255,.35);
      background: rgba(255,255,255,.13);
      color: #fff;
      border-radius: 10px;
      padding: 9px 13px;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      transition: .2s ease;
    }

    .auth-top-btn:hover {
      background: rgba(255,255,255,.24);
      transform: translateY(-1px);
    }

    .auth-top-btn.signup {
      background: #ffffff;
      color: #0757c8;
      border-color: #ffffff;
    }

    .auth-user-box {
      display: none;
      align-items: center;
      gap: 7px;
      color: #fff;
      font-size: 11px;
      font-weight: 700;
    }

    .auth-user-name {
      max-width: 110px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .auth-logout {
      border: 0;
      background: rgba(255,255,255,.15);
      color: white;
      padding: 7px 9px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 10px;
      font-weight: 800;
    }

    .auth-modal {
      position: fixed;
      inset: 0;
      z-index: 5000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 18px;
      background: rgba(3,18,45,.62);
      backdrop-filter: blur(7px);
    }

    .auth-modal.show {
      display: flex;
    }

    .auth-box {
      width: min(430px, 100%);
      max-height: 92vh;
      overflow-y: auto;
      background: #fff;
      border-radius: 22px;
      padding: 24px;
      box-shadow: 0 25px 70px rgba(0,0,0,.28);
      position: relative;
    }

    .auth-close {
      position: absolute;
      right: 15px;
      top: 12px;
      width: 34px;
      height: 34px;
      border: 0;
      border-radius: 50%;
      background: #eef4fb;
      color: #17213a;
      font-size: 20px;
      cursor: pointer;
    }

    .auth-logo {
      width: 62px;
      height: 62px;
      object-fit: contain;
      border-radius: 14px;
      display: block;
      margin-bottom: 12px;
    }

    .auth-box h2 {
      color: #17213a;
      font-size: 24px;
      margin-bottom: 4px;
    }

    .auth-subtitle {
      color: #6f7789;
      font-size: 12px;
      margin-bottom: 18px;
    }

    .auth-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      margin-bottom: 18px;
      background: #f0f5fb;
      padding: 4px;
      border-radius: 11px;
    }

    .auth-tab {
      border: 0;
      padding: 10px;
      border-radius: 8px;
      background: transparent;
      color: #657087;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
    }

    .auth-tab.active {
      background: #fff;
      color: #0757c8;
      box-shadow: 0 3px 10px rgba(20,50,90,.08);
    }

    .auth-form {
      display: none;
    }

    .auth-form.active {
      display: block;
    }

    .auth-field {
      margin-bottom: 11px;
    }

    .auth-field label {
      display: block;
      color: #38445b;
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 5px;
    }

    .auth-field input {
      width: 100%;
      height: 43px;
      border: 1px solid #dce3ed;
      border-radius: 9px;
      padding: 0 12px;
      outline: none;
      color: #17213a;
      background: #fbfdff;
      font-size: 12px;
    }

    .auth-field input:focus {
      border-color: #4b94e8;
      box-shadow: 0 0 0 3px rgba(7,87,200,.08);
    }

    .auth-submit {
      width: 100%;
      height: 46px;
      border: 0;
      border-radius: 10px;
      margin-top: 5px;
      background: linear-gradient(135deg,#0757c8,#16b8dc);
      color: #fff;
      font-size: 12px;
      font-weight: 800;
      cursor: pointer;
      box-shadow: 0 8px 20px rgba(7,87,200,.20);
    }

    .auth-submit:disabled {
      opacity: .6;
      cursor: not-allowed;
    }

    .auth-message {
      min-height: 18px;
      margin-top: 11px;
      font-size: 11px;
      text-align: center;
      font-weight: 600;
    }

    .auth-message.success {
      color: #198544;
    }

    .auth-message.error {
      color: #d62f45;
    }

    @media (max-width: 760px) {

      .topbar {
        gap: 5px;
      }

      .auth-actions {
        gap: 4px;
        margin-right: 4px;
      }

      .auth-top-btn {
        padding: 8px 8px;
        font-size: 9px;
      }

      .auth-user-name {
        display: none;
      }

      .auth-logout {
        padding: 7px;
      }

    }

    @media (min-width: 761px) {

      .sidebar {
        transition:
          transform .25s ease,
          width .25s ease;
      }

      .layout.sidebar-hidden {
        grid-template-columns: 0 minmax(0,1fr);
      }

      .layout.sidebar-hidden .sidebar {
        transform: translateX(-100%);
        overflow: hidden;
        padding-left: 0;
        padding-right: 0;
      }

    }

  `;

  document.head.appendChild(style);

}


/* =====================================================
   CREATE AUTH BUTTONS
===================================================== */

function createAuthButtons() {

  const topbar =
    document.querySelector(".topbar");

  const notification =
    document.querySelector(".notification-btn");

  if (!topbar || !notification) {
    return;
  }

  if (
    document.getElementById(
      "authActions"
    )
  ) {
    return;
  }

  const authActions =
    document.createElement("div");

  authActions.id =
    "authActions";

  authActions.className =
    "auth-actions";

  authActions.innerHTML = `

    <button
      type="button"
      class="auth-top-btn"
      id="topLoginBtn"
    >
      Login
    </button>

    <button
      type="button"
      class="auth-top-btn signup"
      id="topSignupBtn"
    >
      Sign Up
    </button>

    <div
      class="auth-user-box"
      id="authUserBox"
    >

      <span>👤</span>

      <span
        class="auth-user-name"
        id="authUserName"
      >
        User
      </span>

      <button
        type="button"
        class="auth-logout"
        id="logoutBtn"
      >
        Logout
      </button>

    </div>

  `;

  topbar.insertBefore(
    authActions,
    notification
  );

}


/* =====================================================
   CREATE AUTH MODAL
===================================================== */

function createAuthModal() {

  if (
    document.getElementById(
      "authModal"
    )
  ) {
    return;
  }

  const modal =
    document.createElement("div");

  modal.id =
    "authModal";

  modal.className =
    "auth-modal";

  modal.innerHTML = `

    <div class="auth-box">

      <button
        type="button"
        class="auth-close"
        id="authCloseBtn"
      >
        ×
      </button>

      <img
        src="my-manager-logo.png"
        alt="My Manager"
        class="auth-logo"
      >

      <h2 id="authHeading">
        Welcome Back
      </h2>

      <p class="auth-subtitle">
        Login or create your My Manager account.
      </p>

      <div class="auth-tabs">

        <button
          type="button"
          class="auth-tab active"
          id="loginTab"
        >
          Login
        </button>

        <button
          type="button"
          class="auth-tab"
          id="signupTab"
        >
          Sign Up
        </button>

      </div>


      <!-- LOGIN -->

      <form
        class="auth-form active"
        id="loginForm"
      >

        <div class="auth-field">

          <label>Email</label>

          <input
            type="email"
            id="loginEmail"
            placeholder="Enter your email"
            required
          >

        </div>

        <div class="auth-field">

          <label>Password</label>

          <input
            type="password"
            id="loginPassword"
            placeholder="Enter your password"
            required
          >

        </div>

        <button
          type="submit"
          class="auth-submit"
          id="loginSubmit"
        >
          Login
        </button>

      </form>


      <!-- SIGN UP -->

      <form
        class="auth-form"
        id="signupForm"
      >

        <div class="auth-field">

          <label>Username</label>

          <input
            type="text"
            id="signupUsername"
            placeholder="Choose a username"
            required
          >

        </div>

        <div class="auth-field">

          <label>Full Name</label>

          <input
            type="text"
            id="signupFullName"
            placeholder="Enter your full name"
            required
          >

        </div>

        <div class="auth-field">

          <label>Phone</label>

          <input
            type="tel"
            id="signupPhone"
            placeholder="Enter your phone number"
            required
          >

        </div>

        <div class="auth-field">

          <label>Email</label>

          <input
            type="email"
            id="signupEmail"
            placeholder="Enter your email"
            required
          >

        </div>

        <div class="auth-field">

          <label>Password</label>

          <input
            type="password"
            id="signupPassword"
            placeholder="Minimum 6 characters"
            minlength="6"
            required
          >

        </div>

        <button
          type="submit"
          class="auth-submit"
          id="signupSubmit"
        >
          Create Account
        </button>

      </form>


      <div
        class="auth-message"
        id="authMessage"
      ></div>

    </div>

  `;

  document.body.appendChild(modal);

}


/* =====================================================
   AUTH HELPERS
===================================================== */

function openAuthModal(mode = "login") {

  const modal =
    document.getElementById(
      "authModal"
    );

  if (!modal) return;

  modal.classList.add("show");

  setAuthMode(mode);

  clearAuthMessage();

}


function closeAuthModal() {

  const modal =
    document.getElementById(
      "authModal"
    );

  if (modal) {

    modal.classList.remove(
      "show"
    );

  }

}


function setAuthMode(mode) {

  const loginTab =
    document.getElementById(
      "loginTab"
    );

  const signupTab =
    document.getElementById(
      "signupTab"
    );

  const loginForm =
    document.getElementById(
      "loginForm"
    );

  const signupForm =
    document.getElementById(
      "signupForm"
    );

  const heading =
    document.getElementById(
      "authHeading"
    );

  if (mode === "signup") {

    signupTab.classList.add("active");
    loginTab.classList.remove("active");

    signupForm.classList.add("active");
    loginForm.classList.remove("active");

    heading.textContent =
      "Create Your Account";

  } else {

    loginTab.classList.add("active");
    signupTab.classList.remove("active");

    loginForm.classList.add("active");
    signupForm.classList.remove("active");

    heading.textContent =
      "Welcome Back";

  }

}


function showAuthMessage(
  message,
  type = "error"
) {

  const box =
    document.getElementById(
      "authMessage"
    );

  if (!box) return;

  box.textContent = message;

  box.className =
    `auth-message ${type}`;

}


function clearAuthMessage() {

  const box =
    document.getElementById(
      "authMessage"
    );

  if (!box) return;

  box.textContent = "";

  box.className =
    "auth-message";

}


/* =====================================================
   UPDATE AUTH UI
===================================================== */

async function updateAuthUI(
  supabaseClient
) {

  const loginBtn =
    document.getElementById(
      "topLoginBtn"
    );

  const signupBtn =
    document.getElementById(
      "topSignupBtn"
    );

  const userBox =
    document.getElementById(
      "authUserBox"
    );

  const userName =
    document.getElementById(
      "authUserName"
    );

  const {
    data: {
      session
    }
  } =
    await supabaseClient.auth.getSession();

  if (session && session.user) {

    if (loginBtn)
      loginBtn.style.display = "none";

    if (signupBtn)
      signupBtn.style.display = "none";

    if (userBox)
      userBox.style.display = "flex";

    const metadata =
      session.user.user_metadata || {};

    const name =
      metadata.full_name ||
      metadata.username ||
      session.user.email ||
      "User";

    if (userName)
      userName.textContent = name;

  } else {

    if (loginBtn)
      loginBtn.style.display = "";

    if (signupBtn)
      signupBtn.style.display = "";

    if (userBox)
      userBox.style.display = "none";

  }

}


/* =====================================================
   AUTH EVENTS
===================================================== */

async function setupAuthentication() {

  addAuthStyles();

  createAuthButtons();

  createAuthModal();

  let supabaseClient;

  try {

    const supabaseLib =
      await loadSupabase();

    supabaseClient =
      supabaseLib.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
      );

  } catch (error) {

    console.error(
      "Supabase loading error:",
      error
    );

    return;

  }


  /* ================= BUTTONS ================= */

  document
    .getElementById("topLoginBtn")
    ?.addEventListener(
      "click",
      () => openAuthModal("login")
    );


  document
    .getElementById("topSignupBtn")
    ?.addEventListener(
      "click",
      () => openAuthModal("signup")
    );


  document
    .getElementById("authCloseBtn")
    ?.addEventListener(
      "click",
      closeAuthModal
    );


  document
    .getElementById("loginTab")
    ?.addEventListener(
      "click",
      () => setAuthMode("login")
    );


  document
    .getElementById("signupTab")
    ?.addEventListener(
      "click",
      () => setAuthMode("signup")
    );


  document
    .getElementById("authModal")
    ?.addEventListener(
      "click",
      event => {

        if (
          event.target.id ===
          "authModal"
        ) {

          closeAuthModal();

        }

      }
    );


  /* ================= LOGIN ================= */

  document
    .getElementById("loginForm")
    ?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        clearAuthMessage();

        const email =
          document.getElementById(
            "loginEmail"
          ).value.trim();

        const password =
          document.getElementById(
            "loginPassword"
          ).value;

        const button =
          document.getElementById(
            "loginSubmit"
          );

        button.disabled = true;

        button.textContent =
          "Logging in...";


        const {
          error
        } =
          await supabaseClient.auth
            .signInWithPassword({
              email,
              password
            });


        if (error) {

          showAuthMessage(
            error.message,
            "error"
          );

          button.disabled = false;

          button.textContent =
            "Login";

          return;

        }


        showAuthMessage(
          "Login successful!",
          "success"
        );

        button.disabled = false;

        button.textContent =
          "Login";


        await updateAuthUI(
          supabaseClient
        );

        setTimeout(
          closeAuthModal,
          700
        );

      }
    );


  /* ================= SIGN UP ================= */

  document
    .getElementById("signupForm")
    ?.addEventListener(
      "submit",
      async event => {

        event.preventDefault();

        clearAuthMessage();

        const username =
          document.getElementById(
            "signupUsername"
          ).value.trim();

        const fullName =
          document.getElementById(
            "signupFullName"
          ).value.trim();

        const phone =
          document.getElementById(
            "signupPhone"
          ).value.trim();

        const email =
          document.getElementById(
            "signupEmail"
          ).value.trim();

        const password =
          document.getElementById(
            "signupPassword"
          ).value;


        const button =
          document.getElementById(
            "signupSubmit"
          );

        button.disabled = true;

        button.textContent =
          "Creating Account...";


        const {
          data,
          error
        } =
          await supabaseClient.auth
            .signUp({

              email,

              password,

              options: {

                data: {
                  username,
                  full_name: fullName,
                  phone
                }

              }

            });


        if (error) {

          showAuthMessage(
            error.message,
            "error"
          );

          button.disabled = false;

          button.textContent =
            "Create Account";

          return;

        }


        if (
          data.session
        ) {

          showAuthMessage(
            "Account created successfully!",
            "success"
          );

        } else {

          showAuthMessage(
            "Account created. Please check your email if verification is required.",
            "success"
          );

        }


        button.disabled = false;

        button.textContent =
          "Create Account";


        await updateAuthUI(
          supabaseClient
        );

      }
    );


  /* ================= LOGOUT ================= */

  document
    .getElementById("logoutBtn")
    ?.addEventListener(
      "click",
      async () => {

        await supabaseClient.auth.signOut();

        await updateAuthUI(
          supabaseClient
        );

        showPage("home");

      }
    );


  /* ================= SESSION CHANGES ================= */

  supabaseClient.auth.onAuthStateChange(
    async () => {

      await updateAuthUI(
        supabaseClient
      );

    }
  );


  /* ================= FIRST LOAD ================= */

  await updateAuthUI(
    supabaseClient
  );


  /*
     Save client globally so later
     membership/purchase features
     can use the same connection.
  */

  window.myManagerSupabase =
    supabaseClient;


  console.log(
    "Supabase authentication connected."
  );

}


/* =====================================================
   INITIALIZE
===================================================== */

setupAuthentication();


/* =====================================================
   DEFAULT PAGE
===================================================== */

showPage("home");


console.log(
  "My Manager website loaded successfully."
);
