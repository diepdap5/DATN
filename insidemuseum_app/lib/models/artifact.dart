import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Artifact {
  final String title;
  final String descriptionText;
  final String jidai;
  final List<dynamic> imageNameList;
  Artifact({this.title, this.descriptionText, this.jidai, this.imageNameList});

  factory Artifact.fromJson(Map<String, dynamic> json) {
    return Artifact(
        title: json['title'],
        descriptionText: json['descriptions'][0]["text"],
        jidai: json['jidai_seiki'],
        imageNameList: json['image_files']);
  }
}

Future<Artifact> fetchArtifact(String museumName, String artifactId) async {
  String locale = Intl.getCurrentLocale();
  final response = await http.get(Uri.http(
      '192.168.1.29:3000', '/' + museumName + '/' + locale + '/' + artifactId));
  if (response.statusCode == 200) {
    return Artifact.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load Artifact');
  }
}
