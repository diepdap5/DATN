class Artifact {
  final String title;
  final String descriptionText;
  final String jidai;
  final List<dynamic> imageBase64List;
  final List<dynamic> relevantArtifact;
  Artifact(
      {this.title,
      this.descriptionText,
      this.jidai,
      this.imageBase64List,
      this.relevantArtifact});

  factory Artifact.fromJson(Map<String, dynamic> json) {
    return Artifact(
        title: json['title'],
        descriptionText: json['descriptions'][0]["text"],
        jidai: json['jidai_seiki'],
        imageBase64List: json['image_files'],
        relevantArtifact: json['relevant']);
  }
}
