import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";

@Directive({
  selector: "[throttleClick]",
})
export class ThrottleClickDirective implements OnInit, OnDestroy {
  @Input() public throttleTime = 1000;
  @Output() public throttleClick = new EventEmitter();
  private clicks = new Subject<any>();
  private subscription: Subscription;

  constructor() {}

  ngOnInit() {
    // 拦截点击事件只传递第一次点击事件的处理操作交给parent来处理
    this.subscription = this.clicks
      .throttleTime( this.throttleTime )
      .subscribe(( e ) => this.throttleClick.emit( e ) );
  }

  ngOnDestroy() {
    // 取消订阅
    this.subscription.unsubscribe();
  }

  // HostListener这个装饰器可以监听directive作用的dom元素的click事件，第二个参数$event告诉Angular传递点击事件到directive中去；
  @HostListener( "click", [ "$event" ] )
  clickEvent( event: MouseEvent ) {
    // 防止事件继续向parent component中传递
    event.preventDefault();
    event.stopPropagation();
    // 这里使用subject的.next来传递点击事件，然后使用rxjs的函数操作符throttleTime来处理延时事件，在指定事件内只处理第一次操作，调用emit传递点击事件的操作到parent中去继续处理；
    this.clicks.next( event );
  }
}