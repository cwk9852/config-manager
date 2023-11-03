const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');

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

templates.templates.forEach(template => {
    appConfig.forEach(server => {
        let shouldGenerate = false;

        // Check each condition for the current template
        for (let condition of template.conditions) {
            if (isConditionMet(server, condition)) {
                shouldGenerate = true;
                break;  // Stop checking further conditions if one is met
            }
        }

        if (shouldGenerate) {
            const content = fs.readFileSync(`path_to_${template.name}.docx`, 'binary');
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip);

            doc.setData(server);  // This assumes your DOCX template tags match property names in the server object
            try {
                doc.render();
            } catch (error) {
                throw error;
            }

            const buf = doc.getZip().generate({ type: 'nodebuffer' });
            fs.writeFileSync(`output_path_for_${template.name}_${server.hostname}.docx`, buf);
        }
    });
});
