import * as tslab from "tslab";
let db = require('mysql');

export class C2Utils {

    public static async getBankDetailAsync() {
        // const connection = await db.getConnection();

        const connection = await db.createConnection({
            host: '10.0.0.100',
            user: 'root',
            password: 'heslolv88',
            database: 'c2score'
        });

        let resultArray = [];

        await connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL Server!');
            const sql = "SELECT * from c2score_ScoringWorkbenchView;"
            // const data = connection.query(sql);

            const q = connection.query(sql, (err, rows, fields) => {
                if (err) throw err;
                resultArray = Object.values(JSON.parse(JSON.stringify(rows)));
                connection.end();
                console.log("Data ready");
                console.log(resultArray[0]);
            });
        });
        console.log("aaaaaaaaa");
        return resultArray;
    }

    public static getBankDetail() {
  
        // return new Promise<any>((resolve, reject) => {
            const connection = db.createConnection({
                host: '10.0.0.100',
                user: 'root',
                password: 'heslolv88',
                database: 'c2score'
            });
            connection.connect((err) => {
                if (err) throw err;
                console.log('Connected to MySQL Server!');
            });
            let result = C2Utils.q(connection);    
            return result
    // });
    }

    private static async q(connection){
        const sql = "SELECT * from c2score_ScoringWorkbenchView;"
        const q = await connection.query(sql, (err:any, rows:any) => {
                if (err) throw err;
                let resultArray = Object.values(JSON.parse(JSON.stringify(rows)));
                connection.end();
                console.log("resolving ... Data ready");
                return resultArray;
            });
    }
     public static test(){
         console.log("Test start");
         const data = C2Utils.getBankDetailAsync();
         return data;
     }

    // public static test(){
    //     console.log("Test start");
    //     const promise = C2Utils.getBankDetail();
    //     console.log("promise returned in Test");
    //     let result = [];
    //     promise.then((value) => {
    //         console.log('+++++++++++++++++++++++++++++++++++++++++');
    //         console.log(value[0]);
    //         result = value;
    //     });
    //     console.log("Test exit");
    // }

    private static dbconnection(): any {
        let mysql = require('mysql');
        const connection = mysql.createConnection({
            host: '10.0.0.100',
            user: 'root',
            password: 'heslolv88',
            database: 'c2score'
        });
        connection.connect((err) => {
            if (err) throw err;
            console.log('Connected to MySQL Server!');
        });
        return connection;
    }

    public static getScoringWorkBenchData(): any {
        const sql = "SELECT * from c2score_ScoringWorkbenchView;"
        let resultArray = [];
        let connection = this.dbconnection();
        const q = connection.query(sql, (err, rows, fields) => {
            if (err) throw err;
            resultArray = Object.values(JSON.parse(JSON.stringify(rows)));
            connection.end();
            console.log("Data ready");
        });
        console.log("Returning data");
        return resultArray;
    }


    public static htmlTable(data: any[], withChart: boolean = false): void {
        const first = data[0];
        // Header
        let header: string = '<tr>';
        if (withChart) {
            header += '<th>Chart</th>';
        }
        for (const key in first) {
            header += `<th>${key}</th>`;
        }
        header += '</tr>';

        // Rows
        let body: string = '<tr>';
        data.forEach((i) => {
            if (withChart) {
                body += `<td><img src='https://collective2.com/cgi-perl/xcharts200.mpl?want=nft&width=200&height=150&systemid=${i.StrategyId}'/></a></td>`;
            }

            for (const key in i) {
                body += `<td>${i[key]}</td>`;
            }
            body += '</tr>';
        });

        let table = "<table>" + header + body + "</table>";
        tslab.display.html(table);
    }
}
