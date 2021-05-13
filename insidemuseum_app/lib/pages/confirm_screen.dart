import 'package:camera/camera.dart';
import 'package:flutter/material.dart';
import 'package:insidemuseum_app/pages/camera_screen.dart';
import 'package:insidemuseum_app/pages/result_screen.dart';

class ConfirmScreen extends StatelessWidget {
  final String museum;
  final List<CameraDescription> cameras;

  ConfirmScreen(this.museum, this.cameras);
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      backgroundColor: Colors.white,
      title: Text('AlertDialog Title'),
      content: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Text('Result is true?'),
          ],
        ),
      ),
      actions: <Widget>[
        TextButton(
          child: Text('Confirm'),
          onPressed: () {
            print('Confirmed');
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => CourseInfoScreen(),
              ),
            );
          },
        ),
        TextButton(
          child: Text('Cancel'),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => CameraScreen(
                  model: museum,
                  cameras: cameras,
                ),
              ),
            );
          },
        ),
      ],
    );
  }
}
