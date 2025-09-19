import React, { useState, useRef, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";

// PDF Document Component
const ReportPDF = ({ data }) => {
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 10,
    },
    header: {
      textAlign: "center",
      marginBottom: 15,
    },
    title: {
      fontSize: 14,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 12,
      marginTop: 4,
    },
    table: {
      display: "table",
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    cell: {
      borderStyle: "solid",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      padding: 5,
      flexGrow: 1,
      flexBasis: 0,
      flexShrink: 1,
      textAlign: "center",
      wordBreak: "break-word",
    },
    headerCell: {
      backgroundColor: "#ddd",
      fontWeight: "bold",
    },
    oddRow: {
      backgroundColor: "#f5f5f5",
    },
  });

  return (
    <Document>
      {data?.map((item, index) => (
        <Page size="A4" orientation="landscape" style={styles.page} key={index}>
          <View style={styles.header}>
            <Text style={styles.title}>{item?.school_name}</Text>
            <Text style={styles.subtitle}>
              {item?.level_name} {item?.subject_name}
            </Text>
          </View>

          <View style={styles.table}>
            <View style={styles.row}>
              <Text style={[styles.cell, styles.headerCell]}>Teacher Name</Text>
              <Text style={[styles.cell, styles.headerCell]}>Baseline Complete</Text>
              {item?.teachers?.[0]?.lesson_scores?.map((l, i) => (
                <Text key={i} style={[styles.cell, styles.headerCell]}>
                  {l.lesson_name} Complete
                </Text>
              ))}
              <Text style={[styles.cell, styles.headerCell]}>Summative Complete</Text>
            </View>

            {item?.teachers.length === 0 ? (
              <View style={styles.row}>
                <Text style={styles.cell}>No Teacher found</Text>
              </View>
            ) : (
            item?.teachers.map((teacher, idx) => (
              <View key={idx} style={[styles.row, idx % 2 === 1 ? styles.oddRow : null]} >
                <Text style={styles.cell}>{teacher.teacher_name}</Text>
                <Text style={styles.cell}>{teacher.baseline}%</Text>
                {teacher.lesson_scores.map((l, i) => (
                  <Text key={i} style={styles.cell}>
                    {l.percentage}%
                  </Text>
                ))}
                <Text style={styles.cell}>{teacher.summative}%</Text>
              </View>
            )))}
          </View>
        </Page>
      ))}
    </Document>
  );
};

// Function to convert data to CSV format
const convertToCSV = (data) => {
  if (!data || data.length === 0) return "";

  let csvContent = [];

  data.forEach(({ school_name, subject_name, level_name, teachers }) => {
    const hasTeachers = teachers && teachers.length > 0;
    const lesson_scores = hasTeachers ? teachers[0].lesson_scores : [];
    const totalCols = 2 + lesson_scores.length + 1; // Teacher + Baseline + Lessons + Summative

    // ---- Center School Name ----
    const schoolRow = new Array(totalCols).fill("");
    schoolRow[Math.floor(totalCols / 2)] = school_name;
    csvContent.push(schoolRow);

    // ---- Center Subject Name ----
    const subjectRow = new Array(totalCols).fill("");
    subjectRow[Math.floor(totalCols / 2)] = `${level_name} ${subject_name}`;
    csvContent.push(subjectRow);

    csvContent.push([]); // Blank row

    // ---- Headers ----
    const headers = [
      "Teacher Name",
      "Baseline Complete",
      ...lesson_scores.map((l) => `${l.lesson_name} Complete`),
      "Summative Complete",
    ];
    csvContent.push(headers);

    // ---- Student Rows or "No student found" ----
    if (hasTeachers) {
      teachers.forEach((teacher) => {
        const row = [
          teacher.teacher_name,
          `${teacher.baseline}%`,
          ...teacher.lesson_scores.map((l) => `${l.percentage}%`),
          `${teacher.summative}%`,
        ];
        csvContent.push(row);
      });
    } else {
      const emptyRow = new Array(totalCols).fill("");
      emptyRow[0] = "No teacher found";
      csvContent.push(emptyRow);
    }

    csvContent.push([]); // Blank row between subjects
  });

  // Convert array → CSV string
  return csvContent
    .map((row) =>
      row.map((field) => `"${String(field).replace(/"/g, '""')}"`).join(",")
    )
    .join("\n");
};

// Download Component with Dropdown
export const DistrictReportDownload = ({ data }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Generate PDF blob when data changes
  useEffect(() => {
    const generatePdfBlob = async () => {
      if (!data || data.length === 0) return;
      
      try {
        setIsGenerating(true);
        const blob = await pdf(<ReportPDF data={data} />).toBlob();
        setPdfBlob(blob);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsGenerating(false);
      }
    };
    
    generatePdfBlob();
  }, [data]);

  if (!data || data.length === 0 || data.every(item => item.teachers.length === 0)) {
    return <button className="download-btn" disabled>No Data Found</button>;
  }

  const handleCSVDownload = () => {
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'report.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDropdown(false);
  };

  const handlePDFDownload = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setShowDropdown(false);
    }
  };

  return (
    <div className="download-container" ref={dropdownRef}>
      <button className="download-btn download-cta active" onClick={() => setShowDropdown(!showDropdown)}
        disabled={isGenerating} > {isGenerating ? "Generating Report..." : "Download Report"} </button>
      
      {showDropdown && (
        <div className="download-dropdown">
          <div className={`dropdown-item ${!pdfBlob ? 'disabled' : ''} `} onClick={pdfBlob ? handlePDFDownload : undefined} > Download PDF </div>
          
          <div className="dropdown-item" onClick={handleCSVDownload} > Download CSV </div>
        </div>
      )}
    </div>
  );
};