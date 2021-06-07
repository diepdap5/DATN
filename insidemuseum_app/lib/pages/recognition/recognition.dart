import 'package:flutter/material.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';

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
    Widget _renderStrings() {
      if (widget.results.length == 0) {
        return Container(color: Colors.white);
      } else {
        dynamic re = widget.results.first;
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
      }
      // }).toList();
    }

    return
        // Column(children:
        _renderStrings();
    //  );
  }
}
