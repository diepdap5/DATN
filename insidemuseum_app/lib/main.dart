import 'dart:async';
import 'package:flutter/material.dart';
import 'package:camera/camera.dart';
import 'package:insidemuseum_app/result.dart';
import 'home.dart';
import 'getDataFromAPI.dart';

List<CameraDescription> cameras;

Future<void> main() async {
  // Ensure that plugin services are initialized so that `availableCameras()`
  // can be called before `runApp()`
  WidgetsFlutterBinding.ensureInitialized();

  // Obtain a list of the available cameras on the device.
  final cameras = await availableCameras();

  // Get a specific camera from the list of available cameras.
  // final firstCamera = cameras.first;

  runApp(MaterialApp(
    title: 'Inside Museum',
    theme: ThemeData(
      brightness: Brightness.light,
    ),
    home: HomePage(cameras),
    routes: {
      '/home': (context) => HomePage(cameras),
      '/result': (context) => ResultPage(),
    },
  ));
}
