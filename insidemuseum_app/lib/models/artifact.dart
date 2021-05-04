import 'package:http/http.dart' as http;
import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';

class Artifact {
  final String title;
  final String descriptionText;
  final String jidai;

  Artifact({this.title, this.descriptionText, this.jidai});

  factory Artifact.fromJson(Map<String, dynamic> json) {
    return Artifact(
        title: json['title'],
        descriptionText: json['descriptions'][0]["text"],
        jidai: json['jidai_seiki']);
  }
}

Future<Artifact> fetchArtifact(String museumName, String artifactId) async {
  final response = await http.get(
      // Uri.http('192.168.182.196:3000', '/' + museumName + '/' + artifactId));
      Uri.http('192.168.23.196:3000', '/' + museumName + '/' + artifactId));
  if (response.statusCode == 200) {
    return Artifact.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load Artifact');
  }
}
