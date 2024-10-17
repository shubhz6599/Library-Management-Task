import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { BookService } from '../services/book.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class DashboardComponent implements OnInit, OnDestroy {
  books: any[] = [];
  noBooksAvailable: boolean = false; // Flag to check if there are no books

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    // Subscribe to the book list from BookService
    this.bookService.books$.subscribe((books) => {
      this.books = books;
      console.log(books);
      this.updateCharts(); // Call updateCharts when books change
    });
  }

  updateCharts() {
    const branchCounts = this.countBooksByBranch();
    const branches = Object.keys(branchCounts);
    const counts = Object.values(branchCounts);

    // Update noBooksAvailable flag
    this.noBooksAvailable = this.books.length === 0;

    // Destroy existing charts if they exist
    const barChartCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    const pieChartCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const barChart = Chart.getChart(barChartCanvas); // Get existing bar chart instance
    const pieChart = Chart.getChart(pieChartCanvas); // Get existing pie chart instance

    if (barChart) {
      barChart.destroy(); // Destroy bar chart if it exists
    }
    if (pieChart) {
      pieChart.destroy(); // Destroy pie chart if it exists
    }

    // Only create charts if there are books
    if (!this.noBooksAvailable) {
      // Bar chart
      new Chart(barChartCanvas, {
        type: 'bar',
        data: {
          labels: branches,
          datasets: [
            {
              label: 'Books per Branch',
              data: counts,
              backgroundColor: ['#4CAF50', '#2196F3', '#FFC107'],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true },
          },
        },
      });

      // Pie chart
      new Chart(pieChartCanvas, {
        type: 'pie',
        data: {
          labels: branches,
          datasets: [
            {
              data: counts,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
    }
  }

  // Helper function to count books by branch
  countBooksByBranch() {
    const branchCounts: { [key: string]: number } = {};
    this.books.forEach((book) => {
      if (branchCounts[book.branch]) {
        branchCounts[book.branch] += 1;
      } else {
        branchCounts[book.branch] = 1;
      }
    });
    return branchCounts;
  }

  ngOnDestroy(): void {
    // Destroy charts when the component is destroyed
    const barChartCanvas = document.getElementById('barChart') as HTMLCanvasElement;
    const pieChartCanvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const barChart = Chart.getChart(barChartCanvas);
    const pieChart = Chart.getChart(pieChartCanvas);

    if (barChart) {
      barChart.destroy();
    }
    if (pieChart) {
      pieChart.destroy();
    }
  }
}
