export interface BookingModel {
        Id: string; 
        Name:string;
        StartTime: Date;
        EndTime: Date;
        Description: string;
        AllDay:boolean;
        Recurrence: boolean;
        Categorize: string;        
        Email:string;
        Phone: string;  
        Status:number;    
    
}