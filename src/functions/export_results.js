import jsPDF from "jspdf";
import store from "../store/MainStore.js";
import { sections_comparatif, journey_options } from "../options/options.js";
import { detailled_results_text } from "../options/detailled_results_text.js";

export function exportResults() {
  let pdfName = "impactometre-results";
  var doc = new jsPDF();
  doc.setFont("Helvetica", "Bold");
  var line = 20;
  var left_space = 20;

  doc.text("Impactomètre - Comparatif", left_space, line);

  //TODO: fix this workaround by setting a "name" variable inside Scenario component
  var headers = document.querySelectorAll(".scenario-header h2");

  store.state.scenarios_json.forEach((scenario, index) => {
    if (scenario.meetingDuration > 1) {
      line = 34;
      doc.setFontSize(12);
      doc.setFont("Helvetica", "Bold");
      doc.text(headers[index].textContent, left_space, line);

      doc.setFont("Helvetica", "");
      doc.setFontSize(7);
      line += 6;
      doc.text(
        "Nombre de participants : " + String(scenario.numberOfParticipants),
        left_space,
        line
      );

      line += 4;
      doc.text(
        "Durée de la réunion (min) : " + String(scenario.meetingDuration),
        left_space,
        line
      );

      line += 6;
      doc.text("Logiciel : " + scenario.software.name, left_space, line);
      line += 6;
      doc.setFont("Helvetica", "Bold");
      doc.text("Matériel", left_space, line);
      doc.setFont("Helvetica", "");
      scenario.hardware.forEach((hardware) => {
        if (hardware.qty != 0) {
          line += 4;
          doc.text(
            " - " + String(hardware.qty) + " " + hardware.french,
            left_space,
            line
          );
        }
      });

      line += 6;
      doc.setFont("Helvetica", "Bold");
      doc.text("Trajets", left_space, line);
      doc.setFont("Helvetica", "");
      scenario.journey.forEach((journey) => {
        line += 4;
        var journey_fr = journey_options.find(
          (option) => option.name === journey.mean
        );
        if (journey_fr) {
          doc.text(
            "- " +
              String(journey.distance) +
              " km parcourus en " +
              journey_fr.french,
            left_space,
            line
          );
        }
      });

      left_space = left_space + 65;
    }
  });
  // Canvas
  line = line + 40;
  doc.setFontSize(12);
  doc.setFont("Helvetica", "Bold");
  doc.text("Résultats", 20, line);
  line = line + 10;

  var all_canvas = document.querySelectorAll(
    ".results-chart canvas#horizontalbar-chart"
  );

  all_canvas.forEach((canvas, index) => {
    doc.setFontSize(10);
    doc.setFont("Helvetica", "Bold");
    doc.text(sections_comparatif[index].title, 20, line);
    line = line + 4;

    var canvasImg = canvas.toDataURL("image/png");
    doc.addImage(canvasImg, "PNG", 15, line, 54, 18);

    doc.setFont("Helvetica", "");
    doc.setFontSize(7);
    var sectionText = detailled_results_text[sections_comparatif[index].name];
    // var splitText = doc.splitTextToSize(sectionText,100);
    doc.text(sectionText, 84, line + 4);

    line = line + 40;
  });

  doc.save(pdfName + ".pdf");
}
