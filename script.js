
const SUPABASE_URL = "https://fdvkzfrkzehjpppkwxfx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_G-M7htiXkc27NisikEsDhQ_hFYq1Yt5";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

const registrationForm = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

registrationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const college = document.getElementById("college").value.trim();
    const branch = document.getElementById("branch").value;
    const referralCode = document.getElementById("referralCode").value.trim();
    const urlParams = new URLSearchParams(window.location.search);
const urlReferralCode = urlParams.get("ref");

const finalReferralCode = urlReferralCode || referralCode;

    formMessage.style.color = "#475569";
    formMessage.textContent = "Submitting your registration...";

    const { error } = await supabaseClient
        .from("registrations")
        .insert([
            {
                full_name: fullName,
                email: email,
                college: college,
                branch: branch,
                referral_code: finalReferralCode || null
            }
        ]);

    if (error) {
        console.error("Registration error:", error);
        formMessage.style.color = "red";
        formMessage.textContent =
            "Registration failed. Please try again.";
        return;
    }

    formMessage.style.color = "green";
    formMessage.textContent =
        "Registration successful! Your details have been saved.";

    registrationForm.reset();
});
