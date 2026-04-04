```javascript
// Imperativ (Vanilla JS): Beschreibe WIE
document.getElementById("counter").textContent = count;
document.getElementById("button").disabled = count >= 10;
if (count >= 10) {
  document.getElementById("message").style.display = "block";
}
// Ihr müsst jeden einzelnen Schritt beschreiben.
// Vergisst ihr einen Schritt → Bug.