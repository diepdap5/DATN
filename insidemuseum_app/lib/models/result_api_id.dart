class ArtifactID {
  final String itemKey;
  ArtifactID({this.itemKey});

  factory ArtifactID.fromJson(Map<String, dynamic> json) {
    return ArtifactID(itemKey: json['id']);
  }
}
