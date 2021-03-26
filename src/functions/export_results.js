import jsPDF from "jspdf";
import store from "../store/MainStore.js";
import { sections_comparatif, journey_options } from "../options/options.js";
import { detailed_results_text } from "../options/detailed_results_text.js";

export function exportResults() {
  let pdfName = "impactometre-resultats";
  var doc = new jsPDF();
  doc.setFont("Helvetica", "Bold");
  var line = 18;
  var left_space = 20;

  doc.text("Impactometre.fr", left_space, line);

  //TODO: fix this workaround by setting a "name" variable inside Scenario component
  var headers = document.querySelectorAll(".scenario-header h2");

  store.state.scenarios_json.forEach((scenario, index) => {
    if (scenario.meetingDuration > 1) {
      const isSoftwareEmpty = scenario.software.name == "";

      line = 26;
      doc.setFontSize(12);
      doc.setFont("Helvetica", "Bold");
      doc.text(headers[index].textContent, left_space, line);

      doc.setFont("Helvetica", "");
      doc.setFontSize(7);
      line += 6;
      doc.text("Nombre de participants : " + String(scenario.numberOfParticipants), left_space, line);
      line += 4;
      doc.text("Durée de la réunion (min) : " + String(scenario.meetingDuration), left_space, line);

      line += 6;
      doc.text("Logiciel : " + (isSoftwareEmpty ? "Aucun" : scenario.software.name), left_space, line);
      line += 4;
      if (!isSoftwareEmpty) doc.text("Nombre d'instances du logiciel : " + String(scenario.numberOfInstances), left_space, line);

      line += 6;
      doc.setFont("Helvetica", "Bold");
      doc.text("Matériel", left_space, line);
      doc.setFont("Helvetica", "");
      scenario.hardware.forEach((hardware) => {
        if (hardware.qty != 0) {
          line += 4;
          doc.text(
            String(hardware.qty) + " " + hardware.french.replace(/[^\x00-\x7F]/g, ""),
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
        var journey_fr = journey_options.find((option) => option.name === journey.mean);
        if (journey_fr) {
          doc.text(
            String(journey.distance) + " km parcourus en " + journey_fr.french.replace(/[^\x00-\x7F]/g, ""),
            left_space,
            line
          );
        }
      });

      left_space = left_space + 65;
    }
  });
  // Canvas
  line = line + 34;
  doc.setFontSize(12);
  doc.setFont("Helvetica", "Bold");
  doc.text("Comparaison des scénarios de réunion", 20, line);
  line = line + 10;

  var all_canvas = document.querySelectorAll(".results-chart canvas#horizontalbar-chart");

  all_canvas.forEach((canvas, index) => {
    doc.setFontSize(10);
    doc.setFont("Helvetica", "Bold");
    doc.text(sections_comparatif[index].title, 20, line);
    line = line + 4;

    var canvasImg = canvas.toDataURL("image/png", 1);
    console.log(canvas.width);
    doc.addImage(canvasImg, "PNG", 15, line, 70, (canvas.height * 70) / canvas.width);

    doc.setFont("Helvetica", "");
    doc.setFontSize(8);
    var sectionText = detailed_results_text[sections_comparatif[index].name];
    // var splitText = doc.splitTextToSize(sectionText,100);
    doc.text(sectionText, 100, line + 4);

    line = line + 32;
  });

  doc.setFontSize(12);
  doc.setFont("Helvetica", "Bold");
  line = line + 6;
  doc.text("A propos d'Impactometre.fr", 20, line);
  line = line + 8;
  doc.setFont("Helvetica", "");
  doc.setFontSize(8);
  var about = `Ces comparaisons sont des estimations des impacts environnementaux potentiels. Elles ne constituent pas des mesures réelles.
Les données utilisées proviennent de la base de données EcoInvent et l'évaluation environnementale est réalisée selon Impact2002+.
Vous pouvez retrouver plus d'informations sur la construction de la méthode dans la rubrique « A propos » de Impactometre.fr.

Impactometre.fr a été développé dans le cadre d'un projet de l'Université de technologie de Compiègne et est hébergé par l'association
Picasoft.

Licence libre GNU GPL V3.`;
  doc.text(about, 20, line);

  doc.save(pdfName + ".pdf");
}
