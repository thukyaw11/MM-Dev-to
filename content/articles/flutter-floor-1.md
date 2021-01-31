---
postId: 17
title: Flutter Floor SQLite Database ( 1 )
description: အပိုင်း ၂ က ညကျရေးမယ် ဘောသွားကန်ဦးမယ်
img: https://i.ibb.co/7kzGYYP/Blue-Violet-and-Orange-Shapes-Fitness-Influencer-You-Tube-Thumbnail-Set-1.png
alt: nice image
author: 
  name: minthukyaw
  bio: Yo!
  img: https://scontent.frgn13-1.fna.fbcdn.net/v/t1.0-9/135689214_853777432125795_6331520457020073121_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEpn4IVTRpcDFyGNfRliE7lvpxyTje6Dry-nHJON7oOvF7GkY2dKrKOVYPh3xOrn8Kw66d17q1AiRd6YjNUb8wU&_nc_ohc=OUfJ72cL2McAX-U7jiZ&_nc_ht=scontent.frgn13-1.fna&oh=c204f29ec1107e10d243919ec5e16d32&oe=6025E9AD
tags: 
  - Flutter
---
# Flutter Floor DB
<br>
ဒီနေ့ တော့ stream part 2 လေး မပြောခင် floor generator အကြောင်းလေး ဖြတ်ပြောချင်ပါတယ်

floor ဆိုတာက SQLite abstraction တစ်ခုပါ။ ဒီ package ကို သုံးဖို့ဆိုရင် SQL နဲ့ SQLite သိထားဖို့ 

SQLite ဆိုတာက local storage မှာပဲ key value pair တွေကို သိမ်းထားပေးနိုင်တဲ့ persist data store ပါ။

sqflite ဆိုတဲ့ package ကို အခြေခံပြီး ပြန်ရေးထားတာ လဲ ဖြစ်ပါတယ်။

floor ကို အသုံးပြုပြီး စာရင်းမှတ်တဲ့ app လေး ရေးသွားကြပါမယ်။
<br>
<br>



## Quick Start
<br>
ပထမဦးဆုံး floor ကို dependencies အနေနဲ့ ထည့်သွင်းပေးဖို့ လိုပြီး floor_generator နဲ့ build_runner တို့ကို dev_dependencies အနေနဲ့ထည့်သွင်းပေးရမှာပါ။

flutter_simple_dependency_injection ကိုလဲ dependency injection အနေနဲ့ သုံးသွားပါမယ်။

```dart[pubspec.yaml]
dependencies:
  flutter:
    sdk: flutter
  flutter_simple_dependency_injection: ^1.0.3
  floor: ^0.16.0
  ...

dev_dependencies:
  flutter_test:
    sdk: flutter
  floor_generator: ^0.16.0
  build_runner: ^1.10.3
```

<br>

## Folder Structure
<br>

ဒါက ကျွန်တော်အသုံးပြုမဲ့ folder structure ပါ။ 

```dart[]
- lib
  - db
  	- dao
  		- list_dao.dart
  	- table
  		- list.dart
  	- app_db.dart
  - ui
```

DAO ဆိုတာကတော့ Data Access Object ပါ။ database နဲ့ ချိတ်ဆတ်ရမဲ့ Query တွေကို သတ်မှတ်ပေးရတဲ့ နေရာ ဖြစ်ပါတယ်။ floor မှာတော့ @Query ဆိုတဲ့ annotation နဲ့ query တွေအလွယ်တကူ ရေးနိုင်ပါတယ်။

table folder ထဲမှာတော့ DAO နဲ့ အသုံးပြုမဲ့ model တစ်ခု တည်ဆောက်ပေးကြပါမယ်။ Entity လို့လဲ ပြောနိုင်ပါတယ်။ Database column တွေတည်ဆောက်တာပါ။  @Entity ဆိုတဲ့ annotation နဲ့ အတူ tableName ကိုလဲ ကိုယ်ကြိုက်သလို သတ်မှတ်ပေးလို့ရပါတယ်။ @PrimaryKey , @ColumnInfo(name: '', nullable: false) လိုမျိုး annotation တွေလဲ အသုံးပြုလို့ရပါသေးတယ်။ ပြီးမှ လက်တွေ့ရေးကြည့်ကြပါမယ်။ 

app_db.dart ကတော့ floor database ကို extend လုပ်ပေးရမဲ့ နေရာပါ။
<br>



## Create an Entity
<br>

entity တစ်ခု တည်ဆောက်ကြပါမယ်။ 

```dart[list.dart]
import 'package:floor/floor.dart';
@Entity(tableName: 'sayinlist')
class SaYinList {
  @PrimaryKey(autoGenerate: true)
  final int id;
  final String productName;
  final String note;
  final String quantity;
  final bool isDone;

  SaYinList({this.id, this.productName, this.note, this.quantity, this.isDone});
}

```

class name ကို List လို့ ပေးရင် သွားညိနေမှာစိုးလို့ SaYinList လို့ပေးလိုက်ပါတယ်။ 
@Entity နဲ့ အတူ tablename ပါသတ်မှတ်ပေးထားပါတယ်။ id ကို တော့ primary key အနေနဲ့ autogenerate လုပ်ထားပေးပါတယ်။ ကျန်တာတွေကတော့ ရှင်းမှာပါ။
<br>


## Creat a DAO (Data Access Object)
<br>


```dart[list_dao.dart]
import 'package:floor/floor.dart';
import 'package:flooreg/db/table/list.dart';

@dao
abstract class SaYinListDao {
  @Query("SELECT * FROM sayinlist ORDER BY id DESC")
  Stream<List<SaYinList>> getAllLists();

  @Query("SELECT * FROM sayinlist WHERE id = :id")
  Future<SaYinList> findListById(int id);

  @insert
  Future<void> insertList(SaYinList sayinlist);

  @update
  Future<int> updateList(SaYinList sayinlist);

  @delete
  Future<void> removeList(SaYinList sayinlist);
}

}

```

@Query annotation အပြင် insert, update, delete တွေပါ အသုံးပြုလို့ အဆင်ပြေပါတယ်။ code ကတော့ ရှင်းရှင်းလေးဆိုတော့ နားလည်မယ်ထင်ပါတယ်။ update, insert, delete တွေမှာ SaYinList object တစ်ခုလုံးကို pass ပေးထားပြီး ListById မှာ Id နဲ့ ယူမှာ ဖြစ်တဲ့ အတွက် id ကို parameter အနေနဲ့ လက်ခံထားပါတယ်။
@Query ထဲကကောင်တွေကတော့ sql query တွေပါပဲ။ နားလည်မယ်ထင်ပါတယ်။
<br>


## Config app_db
<br>


``` dart[app_db.dart]
import 'dart:async';

import 'package:floor/floor.dart';
import 'package:flooreg/db/table/list.dart';
import 'package:sqflite/sqlite_api.dart' as sqflite;
import 'package:flooreg/db/dao/list_dao.dart';

part 'app_db.g.dart';

@Database(version: 1, entities: [SaYinList])
abstract class AppDatabase extends FloorDatabase {
  SaYinListDao get sayinlistDao;
}

```

floor က sqflite ကို အသုံးပြုထားတဲ့ အတွက် sqflite_api ကို importလုပ်ပေးရပါတယ်။ သပ်သပ်တော့ သွင်းစရာမလိုပါဘူး။ part 'app_db.g.dart' က floor_generator နဲ့ generate ထုတ်ပြီး ရလာမဲ့ file ပါ။ @Database annotation နဲ့ db version တွေလဲ သတ်မှတ်ပေးလို့ရပါတယ်။ entities အနေနဲ့ ကျွန်တော်တို့ လုပ်ခဲ့တဲ့ SaYinList ကို သုံးပါမယ်။ AppDatabase အနေနဲ့ FloorDatabse ကို extend လုပ်ပြီး သုံးမဲ့ DAO ကို သတ်မှတ်ပေးရပါမယ်။ ပြီးရင် builder_runner ကို သုံးပြီး generate ထုတ်ပါမယ်။

``` shell[terminal]
	flutter pub run builder_runner build
```

ဒါကတော့ one time build ပါ။ ကိုယ်က ပြန်ပြန် မ build ချင်ဘူးဆိုရင်  


``` shell[terminal]
	flutter pub run builder_runner watch 
```

နဲ့ စောင့်ကြည့်ခိုင်းထားလို့ ရပါတယ်။ ကျွန်တော်ကတော့ build ပဲ သုံးပါဦးမယ်။
<br>


## Inject Database
<br>

main.dart ကိုသွားရအောင် အဲမှာ ကျွန်တော်တို့ database ကို build ပေးဖို့လိုပါတယ်။ မ build ခင် WidgetsBinding လုပ်ပေးဖို့လို ပါတယ်။


```dart[main.dart]
import 'package:flutter_simple_dependency_injection/injector.dart';
import 'db/app_db.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
	final _injector = Injector.getInjector();

  	final _database = await $FloorAppDatabase.databaseBuilder('sayinlist.db').build();

  	_injector.map<AppDatabase>((_) => _database);
    
  runApp(MyApp());
}

```
<br>
<br>



### Widgets Flutter Binding
<br>

ကျွန်တော်တို့ FloorAppDatabase ကို သုံးပြီး database တဲ့ အခါ flutter engine ကို သုံးရပါတယ်။
database build တဲ့ အခါ native code တွေယူသုံးရတာ ဖြစ်တဲ့ အတွက် async နဲ့ widget binding ပြီးအောင်စောင့်ရပါမယ်။ ပြီးတာ သေချာမှ native code တွေခေါ်သုံးလို့ရမှာ ဖြစ်တဲ့ အတွက် သုံးရခြင်းပါ။ FloorAppDatabase နဲ့ db ဆောက်ပါမယ်။ ပြီးရင် တော့ fluttter simple injection နဲ့ AppDatabase ကို Inject လုပ်လိုက်ပါမယ်။
ဒါကတော့ database injection ပါ။

Inject လုပ်ပြီး MyApp Widget ထဲမှာ ပြန်သုံးပါမယ်။ 

getter နဲ့ AppDatabase ထဲက injection ကို ပြန်ယူရပါမယ်။



```dart[main.dart]
class MyApp extends StatelessWidget {
  @override
  
  final _injector = Injector.getInjector();
  AppDatabase get _database => _injector.get<AppDatabase>();

  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}
```
ပထမပိုင်းပါ အမှားပါတာရှိရင် ထောက်ပြပေးပါဗျ။ ကျွန်တော် လွဲနေတာလေးတွေလဲ ပြင်လို့ရအောင်ပါ
<b>ညောင်းလာလို့ ဘောလုံးသွားကန်ပါဦးမယ်။</b>
 ညကျရင် ပြန်ရေးပါဦးမယ်။ ကျေးဇူးပါ။ 