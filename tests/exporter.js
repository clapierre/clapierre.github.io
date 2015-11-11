require(["chai","jquery","underscore","tests/utils","text!static/all_question_types.xml","text!static/all_question_types.tsv","text!static/exporter/item-id.xml","text!static/exporter/item-id.tsv","text!static/javaRosa/multi-lang-trans.xml"],function(e,d,j,f,i,c,g,b,h){var a=e.assert,k=f.call;describe("The exporter",function(){beforeEach(function(l){f.init({core:{onReady:function(){l()}}})});it("should include question type in TSV",function(){f.loadXML(i);a.equal(k("getData").core.form.getExportTSV(),c)});it("should include item values in TSV",function(){f.loadXML(g);a.equal(k("getData").core.form.getExportTSV(),b)});it("should properly escape special characters",function(){f.loadXML(h);a.equal(k("getData").core.form.getExportTSV(),'Question\tType\tText (en)\tText (hin)\tAudio (en)\tAudio (hin)\tImage (en)\tImage (hin)\tDisplay Condition\tValidation Condition\tValidation Message\tCalculate Condition\tRequired\n/text\tText\t"""Text"\t"""Text"\t\t\t\t\t\t\t\t\tno')})})});