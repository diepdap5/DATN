import 'package:flutter/material.dart';
import 'package:insidemuseum_app/util/design_course_app_theme.dart';

class MuseumNameComponent extends StatelessWidget {
  final String museumName;

  const MuseumNameComponent({Key key, this.museumName}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(top: 5, bottom: 5, left: 18, right: 18),
      child: Center(
        child: Container(
          height: 50,
          width: 300,
          decoration: BoxDecoration(
              color: DesignCourseAppTheme.nearlyWhite,
              borderRadius: const BorderRadius.all(Radius.circular(24.0)),
              border: Border.all(color: DesignCourseAppTheme.nearlyBlue)),
          child: Center(
            child: Text(
              museumName,
              textAlign: TextAlign.left,
              style: TextStyle(
                fontWeight: FontWeight.w600,
                fontSize: 16,
                letterSpacing: 0.27,
                color: DesignCourseAppTheme.nearlyBlue,
              ),
            ),
          ),
        ),
      ),
    );
  }
}
