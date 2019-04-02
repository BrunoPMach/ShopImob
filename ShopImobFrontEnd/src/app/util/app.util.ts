import { DatePipe } from "@angular/common";

export class AppUtils {

    public static getDateLocaleFormat(value: any): string {
        var datePipe = new DatePipe("en-US");
        return datePipe.transform(value, 'yyyy-MM-dd');
    }

    public static getBRDateLocaleFormat(value: any): string {
        var datePipe = new DatePipe("en-US");
        return datePipe.transform(value, 'dd/MM/yyyy');
    }
}