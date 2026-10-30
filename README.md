# ⚡ Instant Refund & UTR Packet Hop Visualizer

> Solving the single highest-volume customer support ticket in Indian e-commerce & fintech: **"Money Debited from Bank, but Order Failed at Merchant."**

Inspired by Razorpay's **Fix-My-Itch** problem statements.

---

## 🎯 The Real-World Problem
Every day across apps like Swiggy, Zomato, IRCTC, and Nykaa:
- A user approves a UPI payment via MPIN.
- Their bank account is immediately debited (₹1,850 deducted).
- The merchant's order desk experiences a 504 Gateway Timeout or webhook dropout.
- The user sees an "Order Failed" screen, but their money is gone.
- Traditional bank clearing takes **5 to 7 working days** (T+7 EOD batch reconciliation files), triggering anxiety, angry social media posts, and repetitive support escalations.

---

## 🚀 The Solution
This prototype demonstrates:
1. **Real-Time 4-Hop Network Diagnostic:** Exposes the exact failure point between Customer Bank, NPCI UPI Central Switch, Acquiring Gateway, and Merchant Order Desk.
2. **Instant Pre-Funded IMPS Reversal:** Rather than waiting 7 days for inter-bank batch reconciliation, the gateway initiates an immediate reverse payout from a pre-funded merchant liquidity pool in **under 3 seconds**.
3. **UTR Verification & Copy Utility:** Gives the customer their official 12-digit NPCI Bank Reference Number for complete transparency.

---

## 🛠️ Tech Stack
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Build Tool:** Vite 6
- **Celebration Effects:** Canvas Confetti

---

## 💻 Local Development
```bash
npm install
npm run dev
