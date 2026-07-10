/**
 * ============================================================
 *  IMPORTANTE — SINCRONIA COM O CSS
 * ============================================================
 * Este script depende dos MESMOS breakpoints usados no master.css
 * para a .art-section. Se algum dia você mudar os valores das
 * media queries no CSS, TEM que atualizar os valores abaixo também
 * (mobileQuery e tabletQuery), senão o número de colunas calculado
 * aqui vai ficar dessincronizado do grid real.
 *
 * Breakpoints atuais (devem bater com master.css):
 *   - Mobile:  max-width: 500px  → 1 coluna
 *   - Tablet:  max-width: 900px  → 2 colunas
 *   - Desktop: acima de 900px    → 4 colunas
 *
 * A função getColumnCount() é a ÚNICA fonte de verdade sobre quantas
 * colunas existem no momento. Não hardcode o número de colunas em
 * nenhum outro lugar do código.
 * ============================================================
 */
const mobileQuery = window.matchMedia("(max-width: 500px)");
const tabletQuery = window.matchMedia("(max-width: 900px)");

function getColumnCount() {
  if (mobileQuery.matches) return 1;
  if (tabletQuery.matches) return 2;
  return 4;
}

function adjustWideImages() {
  const images = document.querySelectorAll(".art-section img");
  const columns = getColumnCount();

  images.forEach(function (img) {
    function checkProportion() {
      const isWide = img.naturalWidth > img.naturalHeight;
      // Math.min garante que o span NUNCA ultrapassa o número de
      // colunas disponíveis no momento — mesmo que os breakpoints
      // do CSS e do JS fiquem dessincronizados no futuro, isso
      // impede que uma coluna implícita extra seja criada e quebre
      // o layout (foi exatamente esse bug que causamos as imagens
      // sumirem no mobile).
      const span = isWide ? Math.min(2, columns) : 1;
      img.style.gridColumn = `span ${span}`;
    }

    if (img.complete) {
      checkProportion();
    } else {
      img.addEventListener("load", checkProportion);
    }
  });
}

adjustWideImages();
// matchMedia dispara automaticamente quando a tela cruza um
// breakpoint (ex: gira o celular, redimensiona a janela até passar
// de 500px/900px) — mais confiável que ouvir "resize" a cada pixel.
mobileQuery.addEventListener("change", adjustWideImages);
tabletQuery.addEventListener("change", adjustWideImages);
