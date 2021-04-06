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

  @override
  void initState() {
    futureArtifact = fetchArtifact('kyuhaku', 'A12');
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Fetch Data Example'),
      ),
      body: Center(
        child: FutureBuilder<Artifact>(
          future: futureArtifact,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Container(
                padding: EdgeInsets.all(10.0),
                // height: 300,
                child: Center(
                    child: Column(mainAxisSize: MainAxisSize.min, children: [
                  Text(
                    '${snapshot.data.title}',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  Text('${snapshot.data.descriptionText}'),
                ])),
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
