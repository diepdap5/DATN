import 'dart:async';

import 'package:flutter/material.dart';
import 'package:insidemuseum_app/models/artifact.dart';

class ResultPage extends StatefulWidget {
  final String model;
  ResultPage({this.model});
  @override
  _ResultPageState createState() => _ResultPageState();
}

class _ResultPageState extends State<ResultPage> {
  Future<Artifact> futureArtifact;
  static MediaQueryData _mediaQueryData;
  static double _screenWidth;
  static double _screenHeight;
  @override
  void initState() {
    futureArtifact = fetchArtifact('kyuhaku', 'A12');
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    _mediaQueryData = MediaQuery.of(context);
    _screenWidth = _mediaQueryData.size.width;
    _screenHeight = _mediaQueryData.size.height;
    return Scaffold(
      // appBar: AppBar(
      //   title: Text('Fetch Data Example'),
      // ),
      body: Center(
        child: FutureBuilder<Artifact>(
          future: futureArtifact,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return SingleChildScrollView(
                child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Stack(
                    alignment: Alignment.bottomCenter,
                    children: [
                      Container(
                        height: _screenHeight * 0.4,
                        decoration: BoxDecoration(
                          image: DecorationImage(
                              fit: BoxFit.fill,
                              image: AssetImage('assets/demo_image2.jpg')),
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(bottom: 8.0),
                        child: Container(
                            padding: EdgeInsets.all(2.0),
                            child: Text(
                              '${snapshot.data.title}',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 25),
                            ),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.circular(10),
                            )),
                      ),
                    ],
                  ),
                  Text('${snapshot.data.descriptionText}'),
                  Text('${snapshot.data.descriptionText}'),
                  Text('${snapshot.data.descriptionText}'),
                  Text('${snapshot.data.descriptionText}'),
                  Text('${snapshot.data.descriptionText}'),
                ]),
              );
            }
            // By default, show a loading spinner.
            return CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}
