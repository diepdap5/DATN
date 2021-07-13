import 'dart:async';
import 'dart:io';
import 'package:camera/camera.dart';
import 'package:dio/dio.dart';
import 'package:insidemuseum_app/pages/home_screen.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter/material.dart';

class UpdateModelScreen extends StatefulWidget {
  final List<CameraDescription> cameras;

  UpdateModelScreen({Key key, this.cameras});
  @override
  _UpdateModelScreenState createState() => _UpdateModelScreenState();
}

class _UpdateModelScreenState extends State<UpdateModelScreen> {
  var imageUrl =
      "https://firebasestorage.googleapis.com/v0/b/insidemuseum-30c0a.appspot.com/o/model_kyohaku.tflite?alt=media&token=01e06028-2211-4298-af21-cc6a6887ddec";
  var imageUrl2 =
      "https://firebasestorage.googleapis.com/v0/b/insidemuseum-30c0a.appspot.com/o/class_kyohaku.txt?alt=media&token=fc8dfeba-8e56-4f18-ad24-1ce9d646c08f";
  bool downloading = true;
  String downloadingStr = "Downloading";
  double download = 0.0;
  File f1;
  File f2;
  int res1 = 0, res2 = 0, total1 = 0, total2 = 0;
  @override
  void initState() {
    super.initState();
    _updateModel();
  }

  Future _updateModel() async {
    try {
      Dio dio = Dio();
      var dir = await getApplicationDocumentsDirectory();
      String fileName = 'model_kyohaku.tflite';
      String fileName2 = 'label_kyohaku.txt';
      f1 = File("${dir.path}/$fileName");
      f2 = File("${dir.path}/$fileName2");
      var fileExist = await f1.exists();
      var fileExist2 = await f2.exists();
      if (fileExist == false && fileExist2 == false) {
        Future.wait([
          dio.download(imageUrl, "${dir.path}/$fileName",
              onReceiveProgress: (rec, total) {
            setState(() {
              downloading = true;
              // download = (rec / (total * 2)) * 100;
              res1 = rec;
              total1 = total;
              download = ((res1 + res2) / (total1 + total2)) * 100.0;
              downloadingStr = "Downloading : " + (download).toStringAsFixed(0);
            });
            if ((download).toStringAsFixed(0) == "100") {
              setState(() {
                downloading = false;
                downloadingStr = "Completed";
              });
            }
          }),
          dio.download(imageUrl2, "${dir.path}/$fileName2",
              onReceiveProgress: (rec, total) {
            setState(() {
              // download = ((rec) / (total * 2)) * 100;
              download = ((res1 + res2) / (total1 + total2)) * 100.0;
              downloadingStr = "Downloading : " + (download).toStringAsFixed(0);
            });
            if ((download).toStringAsFixed(0) == "100") {
              setState(() {
                downloading = false;
                downloadingStr = "Completed";
              });
            }
          })
        ]);
      } else {
        setState(() {
          downloading = false;
          downloadingStr = "Exist";
        });
      }
    } catch (e) {
      print(e);
    }
  }

  Future _delete() async {
    var dir = await getApplicationDocumentsDirectory();
    f1 = File("${dir.path}/model_kyohaku.tflite");
    f2 = File("${dir.path}/label_kyohaku.txt");
    await f1.delete();
    await f2.delete();
    print(dir.path);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: downloading
            ? Container(
                height: 300,
                width: 300,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    SizedBox(
                      height: 100,
                      width: 100,
                      child: CircularProgressIndicator(
                        strokeWidth: 6.0,
                        backgroundColor: Colors.white,
                        value: download / 100,
                        valueColor:
                            new AlwaysStoppedAnimation<Color>(Colors.blue),
                      ),
                    ),
                    SizedBox(
                      height: 20,
                    ),
                    Text(
                      downloadingStr + '%',
                      style: TextStyle(color: Colors.blue),
                    ),
                  ],
                ),
              )
            : Center(
                child: Container(
                height: 250,
                width: 250,
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.check_circle, color: Colors.blue, size: 100),
                      Text(downloadingStr),
                      TextButton(
                          onPressed: () {
                            _delete();
                          },
                          child: Text('Delete All File')),
                      TextButton(
                          onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (context) =>
                                      HomePage(widget.cameras, null),
                                ));
                          },
                          child: Text('Return HomeScreen'))
                    ]),
              )),
      ),
    );
  }
}
