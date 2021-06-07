import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:insidemuseum_app/util/globals.dart';
import 'package:intl/intl.dart';

class ArtifactDemo {
  final String itemKey;
  final String museum;
  final String title;
  final String imageBase64;
  ArtifactDemo({this.itemKey, this.museum, this.title, this.imageBase64});

  factory ArtifactDemo.fromJson(Map<String, dynamic> json) {
    return ArtifactDemo(
      itemKey: json['organization_item_key'],
      museum: json['organization_path_name'],
      title: json['title'],
      imageBase64: json['image_files'],
    );
  }
}

Future<List<ArtifactDemo>> fetchArtifactDemo(String museum, String page) async {
  String locale = Intl.getCurrentLocale();
  final response = await http.get(Uri.http(serverLink,
      '/getAllPagination/' + museum + '/' + locale + '/page/' + page));
  if (response.statusCode == 200) {
    List jsonResponse = json.decode(response.body);
    return jsonResponse.map((data) => new ArtifactDemo.fromJson(data)).toList();
  } else {
    throw Exception('Unexpected error occured!');
  }
}

Future<List<ArtifactDemo>> fetchSearch(
    String museum, String searchKeyword) async {
  String locale = Intl.getCurrentLocale();
  final response = await http.get(Uri.http(
      serverLink, '/search/' + museum + '/' + locale + '/' + searchKeyword));
  if (response.statusCode == 200) {
    List jsonResponse = json.decode(response.body);
    return jsonResponse.map((data) => new ArtifactDemo.fromJson(data)).toList();
  } else {
    throw Exception('Unexpected error occured!');
  }
}
