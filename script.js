
/* My Manager - navigation, membership plans and Supabase authentication */

const SUPABASE_URL = "https://wdkgquixyujuorhhwvcp.supabase.co";
const SUPABASE_KEY = "sb_publishable_ZvDmSbOy_FqqSblJNVyObw_shXMgJ7U";

const supabaseClient = window.supabase?.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const planData = {
  elite: {
    name: "Elite",
    forText: "FOR BUSINESS OWNERS, ENTREPRENEURS & FAMILIES",
    price: "₹24,999 / 5 Years",
    icon: "♛",
    theme: "elite",
    subtitle: "Premium business, personal and family assistance.",
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
    forText: "FOR WORKING PROFESSIONALS & SALARIED INDIVIDUALS",
    price: "₹6,370 / Year",
    icon: "▣",
    theme: "professional",
    subtitle: "Personal financial assistance for working professionals.",
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
    forText: "FOR STUDENTS",
    price: "₹299 / Year",
    icon: "🎓",
    theme: "student",
    subtitle: "Affordable guidance for students.",
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

const pages = document.querySelectorAll(".page");
const sidebar = document.getElementById("sidebar");
const layout = document.querySelector(".layout");

function showPage(name) {
  pages.forEach(page => {
    page.classList.toggle("active", page.id === `page-${name}`);
  });

  document.querySelectorAll("[data-page]").forEach(control => {
    control.classList.toggle("active", control.dataset.page === name);
  });

  sidebar?.classList.remove("mobile-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page]").forEach(control => {
  control.addEventListener("click", event => {
    event.preventDefault();

    if (control.dataset.page) {
      showPage(control.dataset.page);
    }
  });
});

document.getElementById("menuBtn")?.addEventListener("click", () => {
  if (window.innerWidth <= 760) {
    sidebar?.classList.toggle("mobile-open");
  } else {
    layout?.classList.toggle("sidebar-hidden");
  }
});

function openPlan(key) {
  const plan = planData[key];

  if (!plan) return;

  document.getElementById("detailTitle").textContent = plan.name;
  document.getElementById("detailFor").textContent = plan.forText;
  document.getElementById("detailPrice").textContent = plan.price;
  document.getElementById("detailIcon").textContent = plan.icon;
  document.getElementById("detailSubtitle").textContent = plan.subtitle;

  document.getElementById("detailHero").className =
    `detail-hero ${plan.theme}-theme`;

  document.getElementById("serviceGrid").innerHTML =
    plan.services.map(service => `
      <div class="service-item">
        <span>✓</span>
        <div>${service}</div>
      </div>
    `).join("");

  const message = encodeURIComponent(
    `Hello My Manager, I am interested in the ${plan.name} Plan (${plan.price}). Please share the membership procedure, payment details and next steps. Thank you.`
  );

  document.getElementById("buyPlanBtn").href =
    `https://wa.me/919649950866?text=${message}`;

  showPage("details");
}

document.querySelectorAll("[data-plan]").forEach(control => {
  control.addEventListener("click", () => {
    openPlan(control.dataset.plan);
  });
});

/* Authentication modal */

const authModal = document.getElementById("authModal");
const authMessage = document.getElementById("authMessage");

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

function setAuthTab(tab) {
  document.querySelectorAll("[data-auth-tab]").forEach(button => {
    button.classList.toggle("active", button.dataset.authTab === tab);
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
}

document.querySelectorAll("[data-auth='login']").forEach(button => {
  button.addEventListener("click", () => openAuth("login"));
});

document.querySelectorAll("[data-auth-tab]").forEach(button => {
  button.addEventListener("click", () => {
    setAuthTab(button.dataset.authTab);
  });
});

document.getElementById("authClose").addEventListener("click", closeAuth);

authModal.addEventListener("click", event => {
  if (event.target === authModal) closeAuth();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeAuth();
});

function showAuthMessage(message, type = "") {
  authMessage.textContent = message;
  authMessage.className = `auth-message ${type}`;
}

function setAuthButton(user) {
  const container = document.getElementById("authActions");

  if (!container) return;

  if (user) {
    const label = user.user_metadata?.full_name || user.email || "Account";

    const name = document.createElement("span");
    name.className = "signed-in-label";
    name.textContent = label;
    name.title = label;

    const logoutButton = document.createElement("button");
    logoutButton.className = "login-btn";
    logoutButton.id = "logoutBtn";
    logoutButton.textContent = "Logout";

    container.replaceChildren(name, logoutButton);

    logoutButton.addEventListener("click", async () => {
      if (!supabaseClient) return;

      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        alert(error.message);
      } else {
        setAuthButton(null);
      }
    });
  } else {
    container.innerHTML =
      '<button class="login-btn" data-auth="login">Login / Sign Up</button>';

    container.querySelector("[data-auth]").addEventListener("click", () => {
      openAuth("login");
    });
  }
}

if (supabaseClient) {
  supabaseClient.auth.getSession().then(({ data }) => {
    setAuthButton(data.session?.user || null);
  });

  supabaseClient.auth.onAuthStateChange((_event, session) => {
    setAuthButton(session?.user || null);
  });
} else {
  console.warn(
    "Supabase did not load. Authentication is currently unavailable."
  );
}

document.getElementById("loginForm").addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    if (!supabaseClient) {
      return showAuthMessage(
        "Authentication service could not load. Please refresh and try again.",
        "error"
      );
    }

    showAuthMessage("Signing in…");

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      showAuthMessage(error.message, "error");
    } else {
      showAuthMessage("Login successful.", "success");
      setTimeout(closeAuth, 700);
    }
  }
);

document.getElementById("signupForm").addEventListener(
  "submit",
  async event => {
    event.preventDefault();

    if (!supabaseClient) {
      return showAuthMessage(
        "Authentication service could not load. Please refresh and try again.",
        "error"
      );
    }

    showAuthMessage("Creating account…");

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (error) {
      showAuthMessage(error.message, "error");
    } else if (data.session) {
      showAuthMessage("Account created successfully.", "success");
      setTimeout(closeAuth, 900);
    } else {
      showAuthMessage(
        "Account created. Check your email to confirm your account.",
        "success"
      );
    }
  }
);
