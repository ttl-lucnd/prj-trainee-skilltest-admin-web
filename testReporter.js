import { format } from 'date-fns';
import path from 'path';
const ExcelJS = require('exceljs');
const fs = require('fs');

class ExcelReporter {
    fileName = path.resolve(__filename, `../playwright-report/TestResults_${format(new Date(), "dd_MM_yyyy_HH'h'mm")}.xlsx`);
    async onBegin(config, suite) {
        // Check if the file exists and load it or create a new one
        if (fs.existsSync(this.fileName)) {
          this.workbook = new ExcelJS.Workbook();
          await this.workbook.xlsx.readFile(this.fileName);
          this.worksheet = this.workbook.getWorksheet('Test Results');

          if (!this.worksheet) {
            this.worksheet = this.workbook.addWorksheet('Test Results');
          }
          this.setWorksheetColumns();
        } else {
          this.workbook = new ExcelJS.Workbook();
          this.worksheet = this.workbook.addWorksheet('Test Results');
          this.setWorksheetColumns();
          
          try {
            await this.workbook.xlsx.writeFile(this.fileName);
            console.log('File written successfully!');
          } catch (error) {
            console.error('Error writing file:', error);
          }
        }
    }

    async onTestEnd(test, result) {
        const { title, location } = test;
        const status = result.status;
        const duration = this.convertMsToMinutes(result.duration);
        const errorMessage = !!result.error?.message ? this.removeAnsiCodes(result.error?.message) : '';

        // Add test result row
        this.worksheet.addRow({
            testTime: format(new Date(), 'dd/MM/yyyy HH:mm'),
            location: path.relative(path.resolve('tests'), location.file),
            testName: `${title}`,
            status: status.toUpperCase(),
            duration,
            errorMessage,
        });

        try {
          await this.workbook.xlsx.writeFile(this.fileName);
          console.log('File written successfully!');
          console.log(`Test results saved to ${this.fileName}`);
        } catch (error) {
          console.error('Error writing file:', error);
        }
    }

    setWorksheetColumns() {
      // Define columns on first run
      this.worksheet.columns = [
        { header: 'Test Time', key: 'testTime', width: 20 },
        { header: 'Location', key: 'location', width: 50 },
        { header: 'Test Case', key: 'testName', width: 50 },
        { header: 'Status', key: 'status', width: 15 },
        { header: 'Duration (ms)', key: 'duration', width: 15 },
        { header: 'Error Message', key: 'errorMessage', width: 50 },
      ];
    }

    convertMsToMinutes(ms) {
        const minutes = Math.floor(ms / 60000);  
        const seconds = ((ms % 60000) / 1000).toFixed(0); 
        return `${minutes}m ${seconds}s`;
    }

    removeAnsiCodes = (str) => {
      return str.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '');
    }
}

module.exports = ExcelReporter;