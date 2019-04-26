export class Appconfig{
    
  
    public static AmapKey='87d2c9bd92513c1fef791f898ee48e87';
    public static myPosition="myPosition";//我的坐标；
   
    // public static root=' http://192.168.0.178/park/';
    // public static root='http://192.168.0.119/park/'
    // public static root='http://192.168.10.211/park/'
    // public static root='http://192.168.0.127/'
    //   public static root='http://58.49.114.94:33333/'
    //   public static root='http://wap.joocoo.com:33333/'
    // public static root='http://192.168.0.121/park/';
    //  public static root='http://192.168.0.214/park/';
    // public static root='http://192.168.0.124/park/';
    public static root='http://cdparking.cn/';
    public static baseImgUrl=Appconfig.root+"public/uploads/parkpic/";
   public static baseImgUrl2=Appconfig.root+"";
    public static getBaseUrl(){
        var baseUrl;
       baseUrl=Appconfig.root+"index.php/index/";
        //  baseUrl="http://315wkg.com/"+"appapi/index.php/";
        return baseUrl;
    }
    public static getDebugUrl(){
        return ""
    }
    public static getZkey(){
        return /^[a-zA-Z0-9]{6,}$/;
    }

}
