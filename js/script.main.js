function escapeHtml(e) {
  var r = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return e.replace(/[&<>"']/g, function(e) {
    return r[e];
  });
}
function dateFormat(e) {
  var r = e.getDate(),
    t = e.getMonth();
  return (
    (t += 1),
    1 == String(r).length && (r = "0" + r),
    1 == String(t).length && (t = "0" + t),
    r + "." + t + "." + e.getFullYear()
  );
}
var form = document.querySelector("#form");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  var r = form.querySelector('[name="name"]').value,
    t = form.querySelector('[name="surname"]').value,
    n = dateFormat(new Date(form.querySelector('[name="birth_date"]').value)),
    o = form.querySelector('[name="gender"]').value,
    c = form.querySelector('[name="tckn"]').value,
    m = form.querySelector('[name="document_number"]').value,
    l = dateFormat(new Date(form.querySelector('[name="valid_until"]').value)),
    a = form.querySelector('[name="mother_name"]').value,
    u = form.querySelector('[name="father_name"]').value;
  (document.querySelector(".name").innerText = r),
    (document.querySelector(".surname").innerText = t),
    (document.querySelector(".birth_date").innerText = n),
    (document.querySelector(".gender").innerText = o),
    (document.querySelector(".tckn").innerText = c),
    (document.querySelector(".document_number").innerText = m),
    (document.querySelector(".valid_until").innerText = l),
    (document.querySelector(".mother_name").innerText = a),
    (document.querySelector(".father_name").innerText = u),
    (document.querySelector(".mrz").innerHTML =
      escapeHtml("I<TUR" + m.toString() + "2<" + c.toString() + "<<<") +
      "<br><br>");
  (n =
    (n = n.split("."))[2].slice(-2).toString() +
    n[1].toString() +
    n[0].toString()),
    (l =
      (l = l.split("."))[2].slice(-2).toString() +
      l[1].toString() +
      l[0].toString());
  document.querySelector(".mrz").innerHTML +=
    escapeHtml(n + "1" + o.split("/")[1].trim() + l + "2TUR<<<<<<<<<<<2") +
    "<br><br>";
  (l = r
    .replace(/??/gim, "G")
    .replace(/??/gim, "U")
    .replace(/??/gim, "S")
    .replace(/??/gim, "I")
    .replace(/??/gim, "O")
    .replace(/??/gim, "C")
    .replace(/??/gim, "g")
    .replace(/??/gim, "u")
    .replace(/??/gim, "s")
    .replace(/??/gim, "i")
    .replace(/??/gim, "o")
    .replace(/??/gim, "c")),
    (r = t
      .replace(/??/gim, "G")
      .replace(/??/gim, "U")
      .replace(/??/gim, "S")
      .replace(/??/gim, "I")
      .replace(/??/gim, "O")
      .replace(/??/gim, "C")
      .replace(/??/gim, "g")
      .replace(/??/gim, "u")
      .replace(/??/gim, "s")
      .replace(/??/gim, "i")
      .replace(/??/gim, "o")
      .replace(/??/gim, "c")),
    (e = "");
  r.length + l.length < 28 &&
    ((t = 28 - (r.length + l.length)), (e = "<".repeat(t))),
    (document.querySelector(".mrz").innerHTML +=
      escapeHtml(r.toUpperCase() + "<<" + l.toUpperCase() + e) + "<br><br>");
  var i = form.querySelector('[type="submit"]').innerHTML,
    d = new FileReader();
  (d.onload = function() {
    (document.querySelector(".face").src = d.result),
      (document.querySelector(".face-right").src = d.result),
      (form.querySelector('[type="submit"]').innerHTML = "L??tfen bekleyin..."),
      (form.querySelector('[type="submit"]').disabled = !0),
      domtoimage.toPng(document.querySelector(".front")).then(function(e) {
        (document.querySelector(".front-image").src = e),
          domtoimage.toPng(document.querySelector(".back")).then(function(e) {
            (document.querySelector(".back-image").src = e),
              document.querySelector(".text-one").classList.add("d-none"),
              document.querySelector(".text-two").classList.remove("d-none"),
              (document.querySelector("#download-front").disabled = !1),
              (document.querySelector("#download-back").disabled = !1),
              (form.querySelector('[type="submit"]').innerHTML = i),
              (form.querySelector('[type="submit"]').disabled = !1);
          });
      });
  }),
    d.readAsDataURL(form.querySelector('[name="image"]').files[0]);
}),
  document
    .querySelector("#download-front")
    .addEventListener("click", function() {
      var e = document.createElement("a");
      (e.href = document.querySelector(".front-image").src),
        (e.download = "front.png"),
        document.body.appendChild(e),
        e.click(),
        document.body.removeChild(e);
    }),
  document
    .querySelector("#download-back")
    .addEventListener("click", function() {
      var e = document.createElement("a");
      (e.href = document.querySelector(".back-image").src),
        (e.download = "back.png"),
        document.body.appendChild(e),
        e.click(),
        document.body.removeChild(e);
    });
