function CalcularProduto() {
    var quantidade = document.getElementById("produto.quantidade");
    console.log(quantidade);
    var valor = document.getElementById("produto.valor");
    console.log(valor);
    var custo = document.getElementById("produto.valorCustoUnitario");
    console.log(custo);
    var totalCusto = custo.value * quantidade.value;
    console.log(totalCusto);
    document.getElementById("produto.valorCustoTotal").value = totalCusto.toFixed(2);
    var lucroUnitario = valor.value - custo.value;
    document.getElementById("produto.valorLucroUnitario").value = lucroUnitario.toFixed(2);
    var lucroTotal = lucroUnitario * quantidade.value;
    document.getElementById("produto.valorLucroTotal").value = lucroTotal.toFixed(2);
    var bruto = lucroTotal + totalCusto;
    document.getElementById("produto.valorBruto").value = bruto.toFixed(2);
};
function moeda(a, e, r, t) {
let n = ""
  , h = j = 0
  , u = tamanho2 = 0
  , l = ajd2 = ""
  , o = window.Event ? t.which : t.keyCode;
if (13 == o || 8 == o)
    return !0;
if (n = String.fromCharCode(o),
-1 == "0123456789".indexOf(n))
    return !1;
for (u = a.value.length,
h = 0; h < u && ("0" == a.value.charAt(h) || a.value.charAt(h) == r); h++)
    ;
for (l = ""; h < u; h++)
    -1 != "0123456789".indexOf(a.value.charAt(h)) && (l += a.value.charAt(h));
if (l += n,
0 == (u = l.length) && (a.value = ""),
1 == u && (a.value = "0" + r + "0" + l),
2 == u && (a.value = "0" + r + l),
u > 2) {
    for (ajd2 = "",
    j = 0,
    h = u - 3; h >= 0; h--)
        3 == j && (ajd2 += e,
        j = 0),
        ajd2 += l.charAt(h),
        j++;
    for (a.value = "",
    tamanho2 = ajd2.length,
    h = tamanho2 - 1; h >= 0; h--)
        a.value += ajd2.charAt(h);
    a.value += r + l.substr(u - 2, u)
}
return !1
}