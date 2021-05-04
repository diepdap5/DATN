import 'dart:async';

import 'package:flutter/material.dart';
import 'package:csv/csv.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:insidemuseum_app/pages/design_course_app_theme.dart';

class Recognition extends StatefulWidget {
  final List<dynamic> results;
  Recognition(this.results);
  @override
  _RecognitionState createState() => new _RecognitionState();
}

class _RecognitionState extends State<Recognition> {
  String objectName = "";
  int check = 0;
  @override
  void initState() {
    super.initState();
    _checkResults();
  }

  _checkResults() async {
    if (check == 1) {
      setState(() => check = 0);
    }
  }

  @override
  Widget build(BuildContext context) {
    Future<String> getClassName(String classname) async {
      List<List<dynamic>> data = [];
      int result = 0;
      final myData = await rootBundle.loadString("assets/model_dantochoc.csv");
      List<List<dynamic>> csvTable = CsvToListConverter().convert(myData);

      data = csvTable;
      int len = data[0].length;
      for (int i = 0; i < len; i++) {
        if (data[0][i].replaceAll("\n", "").toString() ==
            classname.toString()) {
          result = i;
        }
      }
      return data[0][result + 1];
    }

    String renderClassName(String classname) {
      getClassName(classname).then((val) => setState(() {
            objectName = val;
          }));
      return objectName;
    }

    List<Widget> _renderStrings() {
      double offset = -10;
      return widget.results.map((re) {
        offset = offset + 14;
        return Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisSize: MainAxisSize.min,
          children: [
            Expanded(
              flex: 6, // 60%
              child: Text(
                // renderClassName(re["label"]),
                "${re["label"]}",
                textAlign: TextAlign.justify,
                style: TextStyle(
                  // fontWeight: FontWeight.w200,
                  fontSize: 15,
                  letterSpacing: 0.27,
                  color: DesignCourseAppTheme.grey,
                ),
              ),
            ),
            Expanded(
              flex: 2, // 60%
              child: Text(
                "${(re["confidence"] * 100).toStringAsFixed(0)}%",
                textAlign: TextAlign.justify,
                style: TextStyle(
                  // fontWeight: FontWeight.w200,
                  fontSize: 15,
                  letterSpacing: 0.27,
                  color: DesignCourseAppTheme.grey,
                ),
              ),
            ),
          ],
        );
      }).toList();
    }

    return Column(children: _renderStrings());
  }
}
