<html>

<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/docxtemplater/3.40.2/docxtemplater.js"></script>
    <script src="https://unpkg.com/pizzip@3.1.4/dist/pizzip.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.js"></script>
    <script src="https://unpkg.com/pizzip@3.1.4/dist/pizzip-utils.js"></script>
    <!--[if IE]>
        <script type="text/javascript" src="https://unpkg.com/pizzip@3.1.4/dist/pizzip-utils-ie.js"></script>
    <![endif]-->
</head>

<body>
    Upload templates.json: <input type="file" id="templateInput" /><br />
    Upload server.json: <input type="file" id="serverInput" /><br />
    Upload .docx files: <input type="file" id="docxInput" multiple /><br />
    <button onclick="generateDocuments()">Generate Documents</button>

    <script>
        let templates, appConfig, docxFiles = {};

        document.getElementById('templateInput').addEventListener('change', event => {
            const file = event.target.files[0];
            if (file.name === 'templates.json') {
                const reader = new FileReader();
                reader.onload = e => templates = JSON.parse(e.target.result);
                reader.readAsText(file);
            }
        });

        document.getElementById('serverInput').addEventListener('change', event => {
            const file = event.target.files[0];
            if (file.name === 'server.json') {
                const reader = new FileReader();
                reader.onload = e => appConfig = JSON.parse(e.target.result);
                reader.readAsText(file);
            }
        });

        document.getElementById('docxInput').addEventListener('change', event => {
            const files = event.target.files;
            for (let file of files) {
                docxFiles[file.name.replace('.docx', '')] = file;  // Using template name as key
            }
        });

        const isConditionMet = (server, condition) => {
            switch (condition.type) {
                case 'propertyExistsInArray':
                    return !!server[condition.propertyPath];
                case 'arrayPropertyHasItemsInArray':
                    return (server[condition.propertyPath] && server[condition.propertyPath].length);
                // ... handle other condition types
            }
            return false;
        };

        function generateDocuments() {
            if (!templates || !appConfig) {
                alert('Please upload both templates.json and server.json.');
                return;
            }

            templates.templates.forEach(template => {
                appConfig.forEach(server => {
                    let shouldGenerate = false;

                    for (let condition of template.conditions) {
                        if (isConditionMet(server, condition)) {
                            shouldGenerate = true;
                            break;
                        }
                    }

                    if (shouldGenerate && docxFiles[template.name]) {
                        const reader = new FileReader();
                        reader.onload = e => {
                            const content = e.target.result;
                            const zip = new PizZip(content);
                            const doc = new window.docxtemplater(zip);

                            doc.setData(server);  // Assuming DOCX template tags match property names in the server object
                            try {
                                doc.render();
                            } catch (error) {
                                console.error('Error rendering doc:', error);
                                return;
                            }

                            const blob = doc.getZip().generate({
                                type: "blob",
                                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                compression: "DEFLATE",
                            });
                            saveAs(blob, `output_for_${template.name}_${server.hostname}.docx`);
                        };
                        reader.readAsBinaryString(docxFiles[template.name]);
                    }
                });
            });
        }
    </script>
</body>

</html>
