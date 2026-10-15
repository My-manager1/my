
/* My Manager - Website JavaScript */

const SUPABASE_URL = "https://wdkgquixyujuorhhwvcp.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZvDmSbOy_FqqSblJNVyObw_shXMgJ7U";

const supabaseClient = window.supabase?.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const plans = {
  elite: {
    name: "Elite",
    price: "₹24,999 / 5 Years",
    icon: "♛",
    theme: "elite-theme",
    audience: "FOR BUSINESS OWNERS, ENTREPRENEURS & FAMILIES",
    description: "Premium business, personal and family assistance.",
    services: [
      "Business & Personal Banking Assistance",
      "Family Financial Support",
      "Loan Guidance & Coordination",
      "Insurance & Claim Assistance",
      "ITR & Tax Coordination",
      "Document Vault & Banking Support",
      "Dedicated Relationship Manager",
      "Priority Support",
      "Business Growth Guidance",
      "Government Scheme Guidance"
    ]
  },

  professional: {
    name: "Professional",
    price: "₹6,370 / Year",
    icon: "▣",
    theme: "professional-theme",
    audience: "FOR WORKING PROFESSIONALS & SALARIED INDIVIDUALS",
    description: "Financial assistance for working professionals.",
    services: [
      "Personal Banking Assistance",
      "Loan Guidance & Coordination",
      "Insurance & Claim Assistance",
      "ITR & Tax Advisory",
      "Document Vault",
      "Banking Complaint Support",
      "Investment Guidance",
      "Dedicated Support"
    ]
  },

  student: {
    name: "Student",
    price: "₹299 / Year",
    icon: "◆",
    theme: "student-theme",
    audience: "FOR STUDENTS",
    description: "Affordable financial guidance for students.",
    services: [
      "Student Banking Assistance",
      "Education Loan Guidance",
      "Scholarship & Financial Guidance",
      "Basic Insurance Awareness",
      "Document Support (KYC etc.)",
      "Financial Literacy & Money Management",
      "Guidance from Experienced Professionals",
      "Support When You Need"
    ]
  }
};

/* Page navigation */

const pages = document.querySelectorAll(".page");
const sidebar = document.getElementById("sidebar");
const layout = document.getElementById("layout");

function showPage(pageName) {
  const target = document.getElementById(`page-${pageName}`);

  if (!target) return;

  pages.forEach(page => {
    page.classList.toggle("active", page === target);
  });

  document.querySelectorAll(".side-link").forEach(link => {
    link.classList.toggle(
      "active",
      link.dataset.page === pageName
    );
  });

  sidebar.classList.remove("mobile-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    showPage(button.dataset.page);
  });
});

/* Desktop sidebar toggle and mobile menu */

document.getElementById("menuBtn").addEventListener("click", () => {
  if (window.innerWidth <= 600) {
    sidebar.classList.toggle("mobile-open");
  } else {
    layout.classList.toggle("sidebar-hidden");
  }
});

/* Membership details */

function openPlan(planKey) {
  const plan = plans[planKey];

  if (!plan) return;

  document.getElementById("detailTitle").textContent = plan.name;
  document.getElementById("detailPrice").textContent = plan.price;
  document.getElementById("detailIcon").textContent = plan.icon;
  document.getElementById("detailFor").textContent = plan.audience;
  document.getElementById("detailSubtitle").textContent = plan.description;

  document.getElementById("detailHero").className =
    `detail-hero ${plan.theme}`;

  const serviceGrid = document.getElementById("serviceGrid");
  serviceGrid.replaceChildren();

  plan.services.forEach(service => {
    const item = document.createElement("div");
    item.className = "service-item";

    const tick = document.createElement("span");
    tick.textContent = "✓";

    const label = document.createElement("div");
    label.textContent = service;

    item.append(tick, label);
    serviceGrid.appendChild(item);
  });

  const message = encodeURIComponent(
    `Hello My Manager, I am interested in the ${plan.name} Plan (${plan.price}). Please share the membership procedure and next steps.`
  );

  document.getElementById("buyPlanBtn").href =
    `https://wa.me/919649950866?text=${message}`;

  showPage("details");
}

document.querySelectorAll("[data-plan]").forEach(button => {
  button.addEventListener("click", () => {
    openPlan(button.dataset.plan);
  });
});

/* Login and Sign Up modal */

const authModal = document.getElementById("authModal");
const authMessage = document.getElementById("authMessage");

function setAuthTab(tab) {
  document.querySelectorAll("[data-auth-tab]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.authTab === tab
    );
  });

  document.getElementById("loginForm").classList.toggle(
    "active",
    tab === "login"
  );

  document.getElementById("signupForm").classList.toggle(
    "active",
    tab === "signup"
  );

  document.getElementById("authTitle").textContent =
    tab === "login" ? "Welcome Back" : "Create Your Account";

  authMessage.textContent = "";
  authMessage.className = "auth-message";
}

function openAuth(tab = "login") {
  authModal.classList.add("show");
  authModal.setAttribute("aria-hidden", "false");
  setAuthTab(tab);
}

function closeAuth() {
  authModal.classList.remove("show");
  authModal.setAttribute("aria-hidden", "true");
  authMessage.textContent = "";
}

document.querySelectorAll("[data-auth]").forEach(button => {
  button.addEventListener("click", () => {
    openAuth(button.dataset.auth);
  });
});

document.querySelectorAll("[data-auth-tab]").forEach(button => {
  button.addEventListener("click", () => {
    setAuthTab(button.dataset.authTab);
  });
});

document.getElementById("authClose").addEventListener(
  "click",
  closeAuth
);

authModal.addEventListener("click", event => {
  if (event.target === authModal) closeAuth();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeAuth();
});

function authStatus(message, type = "") {
  authMessage.textContent = message;
  authMessage.className = `auth-message ${type}`;
}

/* Account display */

function updateProfile(user) {
  const name = document.getElementById("profileName");
  const email = document.getElementById("profileEmail");
  const logout = document.getElementById("profileLogout");

  if (user) {
    name.textContent =
      user.user_metadata?.full_name || "My Manager Member";

    email.textContent = user.email || "";
    logout.hidden = false;
  } else {
    name.textContent = "Welcome to My Manager";
    email.textContent = "Sign in to view your account information.";
    logout.hidden = true;
  }
}

function updateAuthButtons(user) {
  const container = document.getElementById("authActions");

  container.replaceChildren();

  if (!user) {
    const login = document.createElement("button");
    login.className = "login-btn";
    login.textContent = "Login";
    login.addEventListener("click", () => openAuth("login"));

    const signup = document.createElement("button");
    signup.className = "signup-btn";
    signup.textContent = "Sign Up";
    signup.addEventListener("click", () => openAuth("signup"));

    const notification = document.createElement("button");
    notification.className = "notification-btn";
    notification.id = "notificationBtn";
    notification.setAttribute("aria-label", "Notifications");
    notification.textContent = "♧";

    const count = document.createElement("span");
    count.className = "notification-count";
    count.textContent = "3";
    notification.appendChild(count);

    container.append(login, signup, notification);
  } else {
    const label = document.createElement("span");
    label.className = "signed-in-label";
    label.textContent = user.user_metadata?.full_name || user.email;

    const logout = document.createElement("button");
    logout.className = "login-btn";
    logout.textContent = "Logout";
    logout.addEventListener("click", signOut);

    container.append(label, logout);
  }
}

async function signOut() {
  if (!supabaseClient) {
    alert("Authentication service is unavailable.");
    return;
  }

  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    alert(error.message);
  } else {
    updateProfile(null);
    updateAuthButtons(null);
    showPage("home");
  }
}

document.getElementById("profileLogout").addEventListener(
  "click",
  signOut
);

/* Supabase session */

if (supabaseClient) {
  supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) {
      console.error("Could not retrieve session:", error.message);
      return;
    }

    const user = data.session?.user || null;
    updateProfile(user);
    updateAuthButtons(user);
  });

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    const user = session?.user || null;
    updateProfile(user);
    updateAuthButtons(user);
  });
} else {
  console.warn("Supabase is unavailable. Login and signup cannot work until it loads.");
}

/* Login form */

document.getElementById("loginForm").addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    if (!supabaseClient) {
      authStatus("Authentication service unavailable. Please refresh.", "error");
      return;
    }

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    authStatus("Signing in...");

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      authStatus(error.message, "error");
    } else {
      authStatus("Login successful.", "success");
      setTimeout(closeAuth, 700);
    }
  }
);

/* Signup form */

document.getElementById("signupForm").addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    if (!supabaseClient) {
      authStatus("Authentication service unavailable. Please refresh.", "error");
      return;
    }

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    authStatus("Creating account...");

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    if (error) {
      authStatus(error.message, "error");
    } else if (data.session) {
      authStatus("Account created successfully.", "success");
      setTimeout(closeAuth, 900);
    } else {
      authStatus(
        "Account created. Check your email to confirm your account.",
        "success"
      );
    }
  }
);

/* Notification dropdown */

function toggleNotifications() {
  const panel = document.getElementById("notificationPanel");
  panel.hidden = !panel.hidden;
}

document.getElementById("notificationBtn")?.addEventListener(
  "click",
  toggleNotifications
);

document.addEventListener("click", event => {
  const panel = document.getElementById("notificationPanel");
  const bell = document.getElementById("notificationBtn");

  if (
    panel &&
    !panel.hidden &&
    !panel.contains(event.target) &&
    !bell?.contains(event.target)
  ) {
    panel.hidden = true;
  }
});
