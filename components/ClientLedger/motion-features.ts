// Loaded on demand, the first time the ledger nears the viewport. Keeping Framer Motion's
// animation engine out of the first page load is worth about 30KB of script on a phone.
export { animate, domAnimation } from "framer-motion";
