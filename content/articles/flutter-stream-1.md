---
postId: 15
title: Flutter Stream Builder (part - 1)
description: Flutter Stream Builder ဆိုတာဘာလဲ?
img: https://i.ibb.co/JmLs79Q/Blue-Violet-and-Orange-Shapes-Fitness-Influencer-You-Tube-Thumbnail-Set.png
alt: nice image
author: 
  name: minthukyaw
  bio: Yo!
  img: https://scontent.frgn13-1.fna.fbcdn.net/v/t1.0-9/135689214_853777432125795_6331520457020073121_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEpn4IVTRpcDFyGNfRliE7lvpxyTje6Dry-nHJON7oOvF7GkY2dKrKOVYPh3xOrn8Kw66d17q1AiRd6YjNUb8wU&_nc_ohc=OUfJ72cL2McAX-U7jiZ&_nc_ht=scontent.frgn13-1.fna&oh=c204f29ec1107e10d243919ec5e16d32&oe=6025E9AD
tags: 
  - Flutter
---
ဒီ blog မှာတော့ Flutter ရဲ့ Stream Builder ကိုစတင်လေ့လာသွားကြပါမယ်။ Stream က နောက်ပိုင်း app တွေရေးတဲ့ အခါ တော်တော်လေး မရှိမဖြစ်လို့ အသုံးဝင်ပါတယ်။ Stream Builder ကို သုံးပြီး demo သေးသေးလေးရေးကြည့်ပါမယ်။

### Stream Builder
<br>
Stream Builder က Widget တစ်ခုပါပဲ။ Flutter ရဲ့ ထုံးစံအတိုင်း everything is widget ပါ။ Stream Builder ကို argument နှစ်ခု pass ပေးရပါတယ်။ 
Stream တစ်ခု နဲ့ builder တစ်ခုပါ။ builder က stream ထဲက လာတဲ့ ကောင်တွေကို widget ပြောင်းပေးတာပါ။

Stream ကို ဥပမာပေးရရင် ပိုက် တစ်လုံးနဲ့ တူပါတယ်။ တစ်ဖက်က ဝင်လာတဲ့ ကောင်ကို တခြားတစ်ဖက်ကနေထိုင်စောင့်နေတဲ့ သဘောမျိုးပါ။ စက်ရုံတွေမှာ ပစ္စည်းတွေတန်းစီ ထွက်လာတာကို အလုပ်သမားက ပါကင်ပိတ်နေတဲ့ ပုံစံနဲ့ လဲ တူပါတယ်။ Stream တစ်ခု build ပြီး အဲထဲကို တစ်ခုခု sink လုပ်ပေးလိုက်လို့ရပါတယ်။ Stream တစ်ခုမှာ multiple listeners တွေလဲ ရှိနိုင်ပါတယ်။ ကျွန်တော်တို့ မြင်သာအောင် စရေးကြည့်ရအောင်

စစချင်းမှာ loading လည်နေပြီး button click မှ image တွေတစ်ခု ချင်းစီကို ပြတဲ့ mini demo လေးရေးကြည့်ပါမယ်။
<br>
<div class="c_img_container">
    <img src="https://i.ibb.co/Gt4dLPQ/Untitled-design.png" alt="image" width="100%">
</div>
<br>

### Code Implementation

```dart[stream_builder.dart]
  final imageStream = StreamController<Image>();
```

Stream Controller တစ်ခု တည်ဆောက်ရပါမယ်။ 

<div class="c_img_container">
    <img src="https://i.ibb.co/jLjD1bY/Untitled-design-1.png" alt="image" width="100%">
</div>


Slide Image button ကို click လိုက်တာနဲ့ loading ကို remove ပြီး stream ထဲကို ပုံတွေ sink လုပ်ပြီး ထည့်မှာပါ။

### Stream Builder Widget တစ်ခု စဆောက်ပါမယ်



```dart[stream_builder.dart]
 StreamBuilder(
        stream: imageStream.stream,
        builder:
            (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
              if (!snapshot.hasData) {
                return CircularProgressIndicator(
                  backgroundColor: Colors.white,
                  strokeWidth: 3,
                  valueColor:
                      new AlwaysStoppedAnimation<Color>(Colors.black),
                    );
                  }

              if (snapshot.connectionState == ConnectionState.done) {}
              return Container(
                height: 220,
                width: 220,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                ),
                child: ClipRRect(
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                      child: snapshot.data,
                    ),
                  );
                }),
```
  
ဒါက button click တိုင်းမှာ stream ထဲကို ပုံတွေ sink လုပ်မှာပါ

```dart[stream_builder.dart]
  if (imageCounter < imageList.length) {
        imageStream.sink.add(imageList[imageCounter]);
        } else {
      imageStream.close();
    }
```

image List တစ်ခုကတော့ ကိုယ့်ဘာသာဆောက်ထားဖို့ လိုပါလိမ့်မယ်။

## Code File
<br>
code ဖတ်ကြည့်ရင်တော့ နားလည်လွယ်မယ်ထင်ပါတယ်။

<br>

```dart[stream_builder.dart]
import 'dart:async';

import 'package:flutter/material.dart';

class FLutterStreamBuilder extends StatefulWidget {
  @override
  _FLutterStreamBuilderState createState() => _FLutterStreamBuilderState();
}

class _FLutterStreamBuilderState extends State<FLutterStreamBuilder> {
  final imageStream = StreamController<Image>();
  int imageCounter = -1;

  double _height;
  double _width;

  final List<Image> imageList = [
    Image.asset(
      'assets/images/image-one.jpg',
      fit: BoxFit.cover,
    ),
    Image.asset(
      'assets/images/image-two.jpeg',
      fit: BoxFit.cover,
    ),
    Image.asset(
      'assets/images/image-three.jpeg',
      fit: BoxFit.cover,
    ),
    Image.asset(
      'assets/images/image-four.jpeg',
      fit: BoxFit.cover,
    ),
  ];

  @override
  void dispose() {
    imageStream.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    _height = MediaQuery.of(context).size.height;
    _width = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Container(
        height: _height,
        width: _width,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            StreamBuilder(
                stream: imageStream.stream,
                builder:
                    (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
                  if (!snapshot.hasData) {
                    return CircularProgressIndicator(
                      backgroundColor: Colors.white,
                      strokeWidth: 3,
                      valueColor:
                          new AlwaysStoppedAnimation<Color>(Colors.black),
                    );
                  }

                  if (snapshot.connectionState == ConnectionState.done) {}
                  return Container(
                    height: 220,
                    width: 220,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                    ),
                    //  color: snapshot.data,
                    child: ClipRRect(
                      borderRadius: BorderRadius.all(Radius.circular(10)),
                      child: snapshot.data,
                    ),
                  );
                }),
            RaisedButton(
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(30)),
              color: Colors.black,
              onPressed: () {
                imageCounter++;

                if (imageCounter < imageList.length) {
                  imageStream.sink.add(imageList[imageCounter]);
                } else {
                  imageStream.close();
                }
              },
              textColor: Colors.white,
              child: Text(
                "Slide image".toUpperCase(),
                style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    letterSpacing: 1),
              ),
            )
          ],
        ),
      ),
    );
  }
}

```
<br>
Stream ကိုတော့ dispose ပြန်လုပ်ပေးဖို့ လိုပါတယ်။ မလုပ်ပေးရင် stream က တောက်လျှောက် run နေပြီး memory နဲ့ ပတ်သတ်ပြီး ပြသနာရှိလာနိုင်ပါတယ်။

ဒါက stream အစပဲရှိပါသေးတယ်။ 

နောက် blog တွေမှာ stream boardcasting အကြောင်းတွေ ထပ်ရေးပါဦးမယ်

blog တင်တိုင်း သိချင်တယ်ဆိုရင် subscribe လုပ်သွားပေးပါ ကျေးဇူးပါ
              