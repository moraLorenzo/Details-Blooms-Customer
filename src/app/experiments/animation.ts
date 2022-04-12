import { trigger, state, style, transition,
    animate, group, query, stagger, keyframes
} from '@angular/animations';

export const SlideInOutAnimation = [
    trigger('slideInOut', [
        state('in', style({
            'max-height': '500px', 'opacity': '1', 'visibility': 'visible'
        })),
        state('out', style({
            'max-height': '0px', 'opacity': '0', 'visibility': 'hidden'
        })),
        transition('in => out', [group([
            animate('400ms ease-in-out', style({
                'opacity': '0'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '0px'
            })),
            animate('700ms ease-in-out', style({
                'visibility': 'hidden'
            }))
        ]
        )]),
        transition('out => in', [group([
            animate('1ms ease-in-out', style({
                'visibility': 'visible'
            })),
            animate('600ms ease-in-out', style({
                'max-height': '500px'
            })),
            animate('800ms ease-in-out', style({
                'opacity': '1'
            }))
        ]
        )])
    ]),
]


// checkoutdialog.afterClosed().subscribe(result => {
//     if (result == true) {
//         this.dataService
//         .processData(
//           btoa('checkout').replace('=', ''),
//           {
//             user_id,
//             order_id,
//             order_flower,
//             main_flower,
//             secondary_flower,
//             tertiary_flower,
//             quantity,
//             order_totalprice,
//             order_recipient,
//             order_payment,
//             order_date,
//             order_time,
//             order_landmark,
//             order_address,
//             order_message,
//             order_purpose,
//             order_contact,
//           },
//           2
//         )
//         .subscribe(
//           (dt: any) => {
//             // console.log(dt.a);
//             let load = this.dataService.decrypt(dt.a);
//             console.log(load.status);

//             this.snackbar(load.status.message);
//             this.router.navigate(['nav/toPay']);
//           },
//           (er) => {
//             this.snackbar('Invalid Inputs');
//           }
//         );
//     }
//     else {
//       console.log("dialog closed");
//     }
//   });